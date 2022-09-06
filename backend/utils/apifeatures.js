const { json } = require("express/lib/response");

class apifeatures{
    constructor(query, queryString) {
        this.query = query,
        this.queryString = queryString
    }

    search() {
        const keyword = this.queryString.keyword ? {
            name : {
                $regex: this.queryString.keyword,
                $options : 'i'
            }
        } : {}

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const querycopy = { ...this.queryString };
        
        //removing some field for category
        const removefields = ["keyword", "page", "limit"]
        removefields.forEach((key) => delete querycopy[key]);

        //filter for for proze and ratting --->
        let queryString = JSON.stringify(querycopy);
        queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, (key)=> `$${key}`)
        
        this.query = this.query.find(JSON.parse(queryString))
        return this 
    }

    pagination(resultperpage) {
        const currentpage = Number(this.queryString.page) || 1

        const skip = resultperpage * (currentpage - 1);

        this.query = this.query.limit(resultperpage).skip(skip)
        return this
    }
}

module.exports = apifeatures;