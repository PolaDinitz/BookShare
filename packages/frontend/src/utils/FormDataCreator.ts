const createFormData = (object: any) => {
    let formData = new FormData();
    for ( const key in object ) {
        formData.append(key, object[key]);
    }
    return formData;
}

export default createFormData;