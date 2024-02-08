export const useValidation = (props, submitted) => {
    const error = {};
    let isError = false
    props.forEach((prop) => {
        const { name, value, type, min, max, comparer, includeNumber, customMessage, required } = prop
        if (!value) {
            isError = required
            if ((value || submitted) && required)
                error[`${name}_error`] = customMessage.required || `This is Required`
        }
        else {
            if (type === 'string') {
                if (value.length < min) {
                    error[`${name}_error`] = customMessage.min || `Min ${min} character`
                    isError = true
                }

                if (value.length > max) {
                    error[`${name}_error`] = customMessage.max || `Max ${max} character`
                    isError = true
                }

                if (!includeNumber && /\d/.test(value)) {
                    error[`${name}_error`] = customMessage.includeNumber || `Numbers cannot be entered`
                    isError = true
                }
            }


            if (type === 'email') {
                if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                    error[`${name}_error`] = customMessage.email || `Email address is not valid`
                    isError = true
                }
            }

            if (type === 'compare') {
                if (value !== comparer) {
                    error[`${name}_error`] = customMessage.compare || `The values are not same`
                    isError = true
                }
            }
        }

    })

    return { error, isError }

}