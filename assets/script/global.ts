import { _decorator, Component, Game, Node } from 'cc';
import { GameState } from './Enum';
const { ccclass, property } = _decorator;

declare global {

    var app: any;
}

app.gameState = GameState.GAME_INIT;