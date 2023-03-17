


export const isphoneOk = (value: string ): boolean => {

    const phoneRegExp = /^\d{1,9}$/
    return phoneRegExp.test(value)

}

