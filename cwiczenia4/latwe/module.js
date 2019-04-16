module.exports = class Operation
{
    constructor(x , y)
    {
        this.type = 'operation';
        this.x = x;
        this.y = y;
    }

    /**This function returns sum of variable */
    sum()
    {
        return this.x + this.y;
    }
}