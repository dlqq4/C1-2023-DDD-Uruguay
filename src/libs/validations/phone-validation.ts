


/**
 * The function isphoneOk() takes a string as an argument and returns true if the string is a valid
 * phone number and false if it is not.
 * @param {string} value - string - the value of the input field
 * @returns A function that takes a string and returns a boolean.
 */
export const isphoneOk = (value: string ): boolean => {

    const phoneRegExp = /^\d{1,9}$/
    return phoneRegExp.test(value)

}

