class Vec {
    /**
     * @param {number} x
     * @param {number} y
     * */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /** @param {Vec} t */
    add(t) {
        return v(this.x + t.x, this.y + t.y);
    }

    /** @param {Vec} t */
    sub(t) {
        return v(this.x - t.x, this.y - t.y);
    }
}

/**
 * @param {number} x
 * @param {number} y
 * */
export function v(x, y) {
    return new Vec(x, y);
}

class Point {
    /**
     * @param {number} x
     * @param {number} y
     * */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /** @param {Vec} t */
    add(t) {
        return p(this.x + t.x, this.y + t.y);
    }

    /** @param {Vec} t */
    sub(t) {
        return p(this.x - t.x, this.y - t.y);
    }

    /** @param {Point} t */
    same(t) {
        return this.x === t.x && this.y === t.y;
    }

    clone() {
        return p(this.x, this.y);
    }
}

/**
 * @param {number} x
 * @param {number} y
 * */
export function p(x, y) {
    return new Point(x, y);
}