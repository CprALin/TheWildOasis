import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() { 
    const { data , error } = await supabase
    .from('cabins').select('*');

    if(error)
    {
        console.error(error);
        throw new Error(`Cabins couldn't be loaded.`);
    }

    return data;
}

export async function createEditCabin(newCabin , id) {
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
    let imageName;
    if (newCabin.image && typeof newCabin.image === 'object' && newCabin.image.name) {
        imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
    } else {
        imageName = `${Math.random()}-default.jpg`; // Fallback or handle as needed
    }
    const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    //https://qaptummpvtensroqyfbn.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
    
    //CREATE/EDIT CABIN
    let query = supabase.from('cabins');

    //CREATE
    if(!id)
    {
      query = query.insert([{...newCabin , image : imagePath }]);
    }
    
    //EDIT
    if(id)
    {
      query = query.update({...newCabin , image : imagePath }).eq("id" , id);
    }

    const {data , error} = await query.select().single();
    
    if(error)
    {
        console.error(error);
        throw new Error(`Cabins couldn't be created.`);
    }

    const {error : storageError} = await supabase.storage
        .from('cabin-images')
        .upload(imageName , newCabin.image);

    if(storageError)
    {
        await supabase.from("cabins").delete().eq("id",data.id);
        console.error(storageError);
        throw new Error("Cabin image could not be uploaded and the cabin was not created.")
    }    

    return data;
}

export async function deleteCabin(id) {
    
    const { error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id);

    if(error)
    {
        /* console.log(error); */
        throw new Error("Cabin could not be deleted");
    }
}

