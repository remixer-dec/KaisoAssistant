export class AModule {
    constructor(cases, activation) {
        this.cases = cases
        this.activation = activation
    }

    check(input, sys) {
        let results = this.cases.filter(x => input.match(x))
        if(results.length > 0) {
            this.activation(input, sys)
            return true
        } else {
            return false
        }
    }
}
