import { p, v } from "./math.js";

/** @typedef {ReturnType<p>} Point */
/** @typedef {ReturnType<v>} Vec */

export const CellStatus = (function () {
    class CellStatus extends Number {
        get opposite() {
            if (this == EMPTY) return EMPTY;
            return def[3 - this.valueOf()];
        }
    }

    let def = Array(3).fill(0).map((_, i) => new CellStatus(i));
    let [EMPTY, BLACK, WHITE] = def;
    return {
        /** @readonly */
        EMPTY,
        /** @readonly */
        BLACK,
        /** @readonly */
        WHITE,
    };
})();
/** @typedef {typeof CellStatus.BLACK} CellStatus */

class ReversiPattern {
    constructor() {
        /** @type {CellStatus[]} */
        this._board;
        this.init();
    }

    /** @param {Point} pos */
    static _vaildPoint(pos) {
        return pos.x >= 0 && pos.x < 8 && pos.y >= 0 && pos.y < 8;
    }

    static _checkDirs = [
        v(-1, -1),
        v(-1, 0),
        v(-1, 1),
        v(0, -1),
        v(0, 1),
        v(1, -1),
        v(1, 0),
        v(1, 1),
    ];

    /**
     * @param {Point} pos
     * @param {CellStatus} color
     * */
    _setStatus(pos, color) {
        this._board[pos.y * 8 + pos.x] = color;
    }
    /**
     * @param {Point} pos
     * @returns {CellStatus}
     * */
    getStatus(pos) {
        return this._board[pos.y * 8 + pos.x];
    }

    /**
     * @param {Point} cp
     * @param {Vec} dir
     * @param {CellStatus} color
     * */
    _checkDirection(cp, dir, color) {
        let hasOpposite = false, op = cp;

        let checking = true;
        while (checking) {
            cp = cp.add(dir);
            if (!ReversiPattern._vaildPoint(cp)) break;

            let cellColor = this.getStatus(cp);
            if (cellColor === color.opposite) {
                hasOpposite = true;
            }
            else {
                if (cellColor === color && hasOpposite) {
                    return { canMove: true, to: cp };
                }
                checking = false;
            }
        }
        return { canMove: false, to: op };
    }

    /**
     * @param {Point} pos 
     * @param {CellStatus} color
     * */
    _canMoveDirections(pos, color) {
        if (this.getStatus(pos) !== CellStatus.EMPTY) return [];
        return ReversiPattern._checkDirs
            .map(dir => ({ ...this._checkDirection(pos, dir, color), dir }))
            .filter(res => res.canMove)
            .map(({ dir, to }) => ({ dir, to }));
    }

    /**
    * @param {Point} pos
    * @param {Point} to
    * @param {Vec} dir
    * @param {CellStatus} setColor
    * */
    _changeColorOnDirection(pos, to, dir, setColor) {
        let isChecking = true;
        while (isChecking) {
            if (to.same(pos)) {
                isChecking = false;
                break;
            }
            to = to.sub(dir);
            this._setStatus(to, setColor);
        }
    }

    init() {
        this._board = Array(8 * 8).fill(CellStatus.EMPTY);
        this._setStatus(p(3, 3), CellStatus.WHITE);
        this._setStatus(p(4, 4), CellStatus.WHITE);
        this._setStatus(p(3, 4), CellStatus.BLACK);
        this._setStatus(p(4, 3), CellStatus.BLACK);
    }

    clone() {
        /** @type {ReversiPattern} */
        let copy = Object.create(ReversiPattern.prototype);
        copy._board = Array.from(this._board);
        return copy;
    }

    /**
     * @param {Point} pos
     * @param {CellStatus} color
     * */
    _checkCanMove(pos, color) {
        return this._canMoveDirections(pos, color).length > 0;
    }

    /**
     * @param {Point} cp 
     * @param {CellStatus} color
     * */
    move(cp, color) {
        const canMoves = this._canMoveDirections(cp, color);
        canMoves.forEach(({ dir, to }) =>
            this._changeColorOnDirection(cp, to, dir, color));
        return canMoves.length > 0;
    }
}

export default class ReversiGame {
    constructor() {
        this._pattern = new ReversiPattern;
        this._playerColor = CellStatus.BLACK;
        this._stoped = false;
    }

    init() {
        this._pattern.init();
        this._playerColor = CellStatus.BLACK;
        this._stoped = false;
    }

    currentPlayer() {
        return this._playerColor;
    }

    isGameOver() {
        return this._stoped;
    }

    /** @param {Point} pos */
    getStatus(pos) {
        return this._pattern.getStatus(pos);
    }

    _checkPass() {
        for (let y = 0; y < 8; ++y) for (let x = 0; x < 8; ++x) {
            if (this._pattern._checkCanMove(p(x, y), this._playerColor)) {
                return false;
            }
        }
        return true;
    }

    _changeColor() {
        this._playerColor = this._playerColor.opposite;
    }

    /** @param {Point} pos */
    move(pos) {
        if (this._stoped) return false;
        if (this._pattern.move(pos, this._playerColor)) {
            this._changeColor();
            if (this._checkPass()) {
                this._changeColor();
                if (this._checkPass()) {
                    this._stoped = true;
                }
            }
            return true;
        }
        return false;
    }
}