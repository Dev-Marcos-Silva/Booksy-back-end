export function clean(value: string | undefined | null){
    
    return value?.trim() === '' ? undefined : value
}

export function validationEmail(value: string | undefined | null){

    if(value?.trim() === '' || value === undefined || value === null ){
        return undefined
    }

    return value.includes('@gmail.com', 3) ? value : undefined
}

export function validationPhone(value: string | undefined | null){

    if(value?.trim() === '' || value === undefined || value === null ){
        return undefined
    }

    return value.length >= 9 ? value : undefined
    
}