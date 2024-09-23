import supabase, { supabaseUrl } from "./supabase";

export async function signup({full_name , email , password}){

    const {data , error} = await supabase.auth.signUp({
        email,
        password,
        options : {
            data : {
                full_name,
                avatar : ''
            }
        }
    });

    if(error) throw new Error(error.message);

    return data;
}

export async function login({email , password}){        

    const { data, error } = await supabase.auth.signInWithPassword({
         email,
         password
    });
    
    if(error) throw new Error(error.message);
    
    return data;
}

export async function getCurrentUser(){
   const {data : session} = await supabase.auth.getSession();

   if(!session.session) return null;

   const {data , error} = await supabase.auth.getUser()

   if(error) throw new Error(error.message);

   return data?.user;
}

export async function logout(){
    const {error} = await supabase.auth.signOut();
    if(error) throw new Error(error.message);
}

export async function updateCurrentUser({password , full_name , avatar}) {
    let updateData;
    if(password) updateData = { password };
    if(full_name) updateData = { data : {full_name}};

    const { data , error } = await supabase.auth.updateUser(updateData);
    
    if(error) throw new Error(error.message);
    if(!avatar) return data;

    const file_name = `avatar-${data.user.id}-${Math.random()}`;

    const { error : storageErr} = await supabase.storage.from('avatars').upload(file_name , avatar);
    if(storageErr) throw new Error(storageErr.message);

    const { data : updatedUser , error : error2 } = supabase.auth.updateUser({data : {
        avatar : `${supabaseUrl}/storage/v1/object/public/avatars/${file_name}`
    }});

    if(error2) throw new Error(error2.message);

    return updatedUser;
}