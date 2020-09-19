<template>
  <div class="hello">
    <h3>{{status}}</h3>
    <div v-for="(line, y) in board" :key="y">
      <div
        v-for="(cell, x) in line"
        :key="x"
        v-bind:class="{
          cell: true,
          whiteDisc: cell == 2,
          blackDisc: cell == 1
      }"
        v-on:click="move(x, y)"
      />
    </div>
  </div>
</template>

<script>
import { p } from "../game/math";
import ReversiGame from "../game/reversi";

/** @param {ReversiGame} game */
function generateBoard(game) {
  return Array(8)
    .fill(null)
    .map((_, y) =>
      Array(8)
        .fill(null)
        .map((_, x) => game.getStatus(p(x, y)).valueOf())
    );
}

export default {
  name: "Reversi",
  $game: ReversiGame,
  data: function () {
    this.$game = new ReversiGame();
    let board = generateBoard(this.$game);
    return { board, status: "Gaming" };
  },
  methods: {
    move(x, y) {
      if (this.$game.move(p(x, y))) {
        this.board = generateBoard(this.$game);
        if (this.$game.isGameOver()) {
            this.status = "GameOver";
        }
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.cell {
  width: 50px;
  height: 50px;
  background-color: darkgreen;
  display: inline-block;
  border: solid 1px white;
  vertical-align: bottom;
}

.cell::before {
  content: "\feff";
  display: block;
  margin-top: 5px;
  margin-left: 5px;
  border-radius: 20px;
  width: 40px;
  height: 40px;
}

.cell.blackDisc::before {
  background-color: black;
}

.cell.whiteDisc::before {
  background-color: white;
}
</style>
