const utils = {
    /**
     * Generate random string excluding some set of strings
     *
     * @param generator
     * @param exclude
     * @returns {*}
     */
    randomExcluding: (generator, exclude = []) => {
        const value = generator()
        if(exclude.includes(value)) return utils.randomExcluding(generator, exclude)
        return value
    }
}

module.exports = utils