import { INewPost, INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases, storage } from "./config";
import { ID, Query } from 'appwrite'

export async function createUserAccount(user: INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        )

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(user.name)
        const newUser = await saveUserToDB(
            {
                accountId: newAccount?.$id,
                name: newAccount?.name,
                email: newAccount?.email,
                username: user.username,
                imageUrl: avatarUrl,
            })
        return newAccount
    } catch (error) {
        console.error(error)
        return error;
    }
}


export async function saveUserToDB(user: {
    accountId: string,
    email: string,
    name: string,
    imageUrl: URL,
    username: string
}) {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user
        )
        return newUser
    } catch (error) {
        console.error("Error from SaveUserDB : ", error)
    }
}


export async function signInAccount(user: {
    email: string,
    password: string
}) {
    try {
        const session = await account.createEmailSession(user.email, user.password)
        return session;
    } catch (error) {
        console.error("Sign In Error :", error)
    }
}

export async function getCurrentUser() {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) throw Error

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if (!currentUser) throw Error

        return currentUser.documents[0];
    } catch (error) {
        console.error("Facing Issue while capturing Current User: ", error)
    }
}


export async function signOutAccount() {
    try {
        const session = await account.deleteSession("current")
        return session;
    } catch (error) {
        console.error("Issue while deleting the session", error)
    }
}


export async function createPost(post: INewPost) {
    try {
        // Upload image to storage
        const uploadedFile = await upLoadFile(post.file[0]);

        if (!uploadedFile) throw Error;

        // get file url
        const fileUrl = getFilePreview(uploadedFile.$id)

        if (!fileUrl) {
            deleteFile(uploadedFile.$id)
            throw Error
        }
        // convert tags into an array
        const tags = post?.tags?.replace(/ /g, "").split(",") || []

        // create post 
        const newPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postsCollectionId,
            ID.unique(), {
            creator: post.userId,
            caption: post.caption,
            imageUrl: fileUrl,
            imageId: uploadedFile.$id,
            location: post.location,
            tags: tags
        })

        if (!newPost) {
            await deleteFile(uploadedFile.$id)
            throw Error
        }
        return newPost
    } catch (error) {
        console.error("Failed while creating the Post", error)
    }
}

export async function upLoadFile(file: File) {
    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            file
        );
        return uploadedFile;
    } catch (error) {
        console.log("Failed while uploading a file to server", error)
    }
}


export async function getFilePreview(fileId: string) {
    try {
        const fileUrl = storage.getFilePreview(appwriteConfig.storageId, fileId, 2000, 2000, 'top', 100)
        if (!fileUrl) throw Error
        return fileUrl
    } catch (error) {
        console.error("Failed while taking the Post Preview", error)
    }
}

export async function deleteFile(fileId: string) {
    try {
        await storage.deleteFile(appwriteConfig.storageId, fileId);
        return { status: "OK" }

    } catch (error) {
        console.error("Failed while deleting the file", error)
    }
}


export async function getRecentPosts() {
    const posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.postsCollectionId,
        [Query.orderDesc(`$createdAt`), Query.limit(20)]
    )
    if (!posts) throw Error

    return posts
}