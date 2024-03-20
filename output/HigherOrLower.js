"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HigherOrLower = void 0;
class HigherOrLower {
    constructor() {
        this.myNumber = 0;
        this.hiddenNumber = 0;
        this.maxNumber = 9;
        this.minNumber = 1;
        this.score = 0;
        this.cpuscore = 0;
        this.maxScore = 5;
        this.guessMade = false;
        this.gameOn = true;
        this.reset();
    }
    reset() {
        this.score = this.cpuscore = 0;
        this.guessMade = false;
        this.gameOn = true;
        this.newNumbers();
    }
    newNumbers() {
        if (this.gameOn == true) {
            this.myNumber = this.randNo(this.maxNumber, this.minNumber);
            this.hiddenNumber = this.randNo(this.maxNumber, this.minNumber);
            while (this.hiddenNumber == this.myNumber) {
                this.hiddenNumber = this.randNo(this.maxNumber, this.minNumber);
            }
            if (this.score > this.maxScore / 2 || this.cpuscore > this.maxScore / 2) {
                this.gameOn = false;
            }
            return true;
        }
        return false;
    }
    guess(higher) {
        if (this.gameOn == false) {
            return false;
        }
        if (higher == true) {
            if (this.hiddenNumber > this.myNumber) {
                this.score++;
                this.newNumbers();
                return true;
            }
            else {
                this.cpuscore++;
                this.newNumbers();
                return false;
            }
        }
        if (this.hiddenNumber < this.myNumber) {
            this.score++;
            this.newNumbers();
            return true;
        }
        this.cpuscore++;
        this.newNumbers();
        return false;
    }
    randNo(max, min) {
        return Math.round((Math.random() * (max - min))) + min;
    }
    GetMyNumber() {
        return this.myNumber;
    }
    GetHiddenNumber() {
        return this.hiddenNumber;
    }
    GetScore() {
        return this.score;
    }
    GetCPUScore() {
        return this.cpuscore;
    }
    GetGameOn() {
        return this.gameOn;
    }
    won() {
        if (this.gameOn == true) {
            return false;
        }
        return this.score > this.cpuscore;
    }
}
exports.HigherOrLower = HigherOrLower;
