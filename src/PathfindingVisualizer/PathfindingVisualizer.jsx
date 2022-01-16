import React, {Component} from 'react';
import Node from './Node/Node';
import {dijkstra, getNodesInShortestPathOrder} from '../algorithms/dijkstra';

import './PathfindingVisualizer.css';

const START_NODE_ROW = 20;
const START_NODE_COL =3;
const FINISH_NODE_ROW = 11;
const FINISH_NODE_COL = 25;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({grid});
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid});
  }

  handleMouseUp() {
    this.setState({mouseIsPressed: false});
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 1 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 1 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 1 * i);
    }
  }

  visualizeDijkstra(textinput) {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[textinput.slice(0,2)][textinput.slice(2)];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  render() {
    const {grid, mouseIsPressed} = this.state;
    

    return (
      <>        
        <input type='text' name ="searchBox" id="searchBox" placeholder="Call No." />
      
        <button onClick={() => this.visualizeDijkstra(document.getElementById("searchBox").value)}>
          Search
        </button>
        
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {row, col, isFinish, isStart, isWall} = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  const Wallpoints = ['1,3', '1,4', '1,5','1,6','1,7','1,8','1,9','1,10','1,12','1,13','1,14','1,15','1,16','1,17','1,18','1,19','1,21','1,22','1,23','1,24','1,25','1,26','1,27','1,28','1,30','1,31','1,32','1,33','1,34','1,35','1,36','1,37','1,39','1,40','1,41','1,42','1,43','1,44','1,45','1,46','1,48','1,49','1,50','1,51','1,52','1,53','1,54','1,55',
  '3,3', '3,4', '3,5','3,6','3,7','3,8','3,9','3,10','3,12','3,13','3,14','3,15','3,16','3,17','3,18','3,19','3,21','3,22','3,23','3,24','3,25','3,26','3,27','3,28','3,30','3,31','3,32','3,33','3,34','3,35','3,36','3,37','3,39','3,40','3,41','3,42','3,43','3,44','3,45','3,46','3,48','3,49','3,50','3,51','3,52','3,53','3,54','3,55',
  '4,3', '4,4', '4,5','4,6','4,7','4,8','4,9','4,10','4,12','4,13','4,14','4,15','4,16','4,17','4,18','4,19','4,21','4,22','4,23','4,24','4,25','4,26','4,27','4,28','4,30','4,31','4,32','4,33','4,34','4,35','4,36','4,37','4,39','4,40','4,41','4,42','4,43','4,44','4,45','4,46','4,48','4,49','4,50','4,51','4,52','4,53','4,54','4,55',
  '6,3', '6,4', '6,5','6,6','6,7','6,8','6,9','6,10','6,12','6,13','6,14','6,15','6,16','6,17','6,18','6,19','6,21','6,22','6,23','6,24','6,25','6,26','6,27','6,28','6,30','6,31','6,32','6,33','6,34','6,35','6,36','6,37','6,39','6,40','6,41','6,42','6,43','6,44','6,45','6,46','6,48','6,49','6,50','6,51','6,52','6,53','6,54','6,55',
  '7,3', '7,4', '7,5','7,6','7,7','7,8','7,9','7,10','7,12','7,13','7,14','7,15','7,16','7,17','7,18','7,19','7,21','7,22','7,23','7,24','7,25','7,26','7,27','7,28','7,30','7,31','7,32','7,33','7,34','7,35','7,36','7,37','7,39','7,40','7,41','7,42','7,43','7,44','7,45','7,46','7,48','7,49','7,50','7,51','7,52','7,53','7,54','7,55',
  '9,3', '9,4', '9,5','9,6','9,7','9,8','9,9','9,10','9,12','9,13','9,14','9,15','9,16','9,17','9,18','9,19','9,21','9,22','9,23','9,24','9,25','9,26','9,27','9,28','9,30','9,31','9,32','9,33','9,34','9,35','9,36','9,37','9,39','9,40','9,41','9,42','9,43','9,44','9,45','9,46','9,48','9,49','9,50','9,51','9,52','9,53','9,54','9,55'
  ,'10,3', '10,4', '10,5', '10,6', '10,7', '10,8', '10,9', '10,10', '10,12', '10,13', '10,14', '10,15', '10,16', '10,17', '10,18', '10,19', '10,21', '10,22', '10,23', '10,24', '10,25', '10,26', '10,27', '10,28', '10,30', '10,31', '10,32', '10,33', '10,34', '10,35', '10,36', '10,37', '10,39', '10,40', '10,41', '10,42', '10,43',
   '10,44', '10,45', '10,46', '10,48', '10,49', '10,50', '10,51', '10,52', '10,53', '10,54', '10,55',
  '12,3', '12,4', '12,5', '12,6', '12,7', '12,8', '12,9', '12,10', '12,12', '12,13', '12,14', '12,15', '12,16', '12,17', '12,18', '12,19', '12,21', '12,22', '12,23', '12,24', '12,25', '12,26', '12,27', '12,28', '12,30', '12,31', '12,32', '12,33', '12,34', '12,35', '12,36', '12,37', '12,39', '12,40', '12,41', '12,42', '12,43', '12,44',
   '12,45', '12,46', '12,48', '12,49', '12,50', '12,51', '12,52', '12,53', '12,54', '12,55',
   '13,3', '13,4', '13,5', '13,6', '13,7', '13,8', '13,9', '13,10', '13,12', '13,13', '13,14', '13,15', '13,16', '13,17', '13,18', '13,19', '13,21', '13,22', '13,23', '13,24', '13,25', '13,26', '13,27', '13,28', '13,30', '13,31', '13,32', '13,33', '13,34', '13,35', '13,36', '13,37', '13,39', '13,40', '13,41', '13,42', '13,43',
    '13,44', '13,45', '13,46', '13,48', '13,49', '13,50', '13,51', '13,52', '13,53', '13,54', '13,55',
    '15,3', '15,4', '15,5', '15,6', '15,7', '15,8', '15,9', '15,10', '15,12', '15,13', '15,14', '15,15', '15,16', '15,17', '15,18', '15,19', '15,21', '15,22', '15,23', '15,24', '15,25', '15,26', '15,27', '15,28', '15,30', '15,31', '15,32', '15,33', '15,34', '15,35', '15,36', '15,37', '15,39', '15,40', '15,41', '15,42', '15,43',
     '15,44', '15,45', '15,46', '15,48', '15,49', '15,50', '15,51', '15,52', '15,53', '15,54', '15,55',
     '24,3','24,4', '24,5','24,6', '24,7', '24,8', '24,9', '24,10', '24,12', '24,13','24,14','24,15','24,16','24,17','24,18','24,19',
     '24,21', '24,22', '24,23', '24,24', '24,25', '24,26', '24,27', '24,28',
     '24,30', '24,31',	'24,32', '24,33', '24,34',	'24,35', '24,36',	'24,37',
     '24,39','24,40', '24,41',	'24,42',	'24,43',	'24,44',	'24,45',	'24,46',
     '24,48',	'24,49',	'24,50',	'24,51',	'24,52',	'24,53',	'24,54','24,55',
     '26,3', '26,4',	'26,5',	'26,6',	'26,7',	'26,8',	'26,9',	'26,10',
     '26,12',	'26,13',	'26,14',	'26,15',	'26,16',	'26,17',	'26,18', '26,19',
     '26,21',	'26,22', '26,23',	'26,24',	'26,25',	'26,26',	'26,27',	'26,28',
     '26,30',	'26,31',	'26,32',	'26,33',	'26,34',	'26,35',	'26,36',	'26,37',
     '26,39',	'26,40',	'26,41',	'26,42',	'26,43', '26,44',	'26,45', '26,46',
     '26,48',	'26,49', '26,50',	'26,51',	'26,52',	'26,53', '26,54', '26,55',
     '27,3',	'27,4',	'27,5',	'27,6',	'27,7',	'27,8',	'27,9',	'27,10',
     '27,12',	'27,13',	'27,14', '27,15',	'27,16',	'27,17',	'27,18',	'27,19',
     '27,21',	'27,22',	'27,23',	'27,24',	'27,25',	'27,26',	'27,27',	'27,28',
     '27,30', '27,31',	'27,32',	'27,33',	'27,34',	'27,35',	'27,36',	'27,37',
     '27,39',	'27,40',	'27,41',	'27,42',	'27,43',	'27,44', '27,45',	'27,46',
     '27,48',	'27,49',	'27,50',	'27,51',	'27,52',	'27,53',	'27,54', '27,55',
     '29,3', '29,4',	'29,5',	'29,6',	'29,7',	'29,8',	'29,9',	'29,10',
     '29,12',	'29,13',	'29,14',	'29,15',	'29,16',	'29,17',	'29,18',	'29,19',
     '29,21',	'29,22',	'29,23',	'29,24',	'29,25', '29,26'	,'29,27',	'29,28',
     '29,30',	'29,31',	'29,32',	'29,33',	'29,34',	'29,35',	'29,36', '29,37',
     '29,39',	'29,40',	'29,41',	'29,42',	'29,43',	'29,44',	'29,45',	'29,46',
     '29,48',	'29,49',	'29,50',	'29,51',	'29,52',	'29,53',	'29,54',	'29,55',
     '30,3', '30,4', '30,5', '30,6', '30,7', '30,8', '30,9', '30,10', 
     '30,12', '30,13', '30,14', '30,15', '30,16', '30,17', '30,18', '30,19',
     '30,21', '30,22', '30,23', '30,24', '30,25', '30,26', '30,27', '30,28',
     '30,30', '30,31', '30,32', '30,33', '30,34', '30,35', '30,36', '30,37', 
     '30,39', '30,40', '30,41', '30,42', '30,43', '30,44', '30,45', '30,46', 
     '30,48', '30,49', '30,50', '30,51', '30,52', '30,53', '30,54', '30,55',
     '32,3', '32,4', '32,5', '32,6', '32,7', '32,8', '32,9', '32,10', 
     '32,12', '32,13', '32,14', '32,15', '32,16', '32,17', '32,18', '32,19', 
     '32,21', '32,22', '32,23', '32,24', '32,25', '32,26', '32,27', '32,28', 
     '32,30', '32,31', '32,32', '32,33', '32,34', '32,35', '32,36', '32,37', 
     '32,39', '32,40', '32,41', '32,42', '32,43', '32,44', '32,45', '32,46', 
     '32,48', '32,49', '32,50', '32,51', '32,52', '32,53', '32,54', '32,55',
     '33,3', '33,4', '33,5', '33,6', '33,7', '33,8', '33,9', '33,10', '33,12', '33,13', '33,14', '33,15', '33,16', '33,17', '33,18', '33,19', '33,21', '33,22', '33,23', '33,24', '33,25', '33,26', '33,27', '33,28', '33,30', '33,31', '33,32', '33,33', '33,34', '33,35', '33,36', '33,37', '33,39', '33,40', '33,41', '33,42', '33,43', '33,44', '33,45', '33,46', '33,48', '33,49', '33,50', '33,51', '33,52', '33,53', '33,54', '33,55',
     '35,3', '35,4', '35,5', '35,6', '35,7', '35,8', '35,9', '35,10', '35,12', '35,13', '35,14', '35,15', '35,16', '35,17', '35,18', '35,19', '35,21', '35,22', '35,23', '35,24', '35,25', '35,26', '35,27', '35,28', '35,30', '35,31', '35,32', '35,33', '35,34', '35,35', '35,36', '35,37', '35,39', '35,40', '35,41', '35,42', '35,43', '35,44', '35,45', '35,46', '35,48', '35,49', '35,50', '35,51', '35,52', '35,53', '35,54', '35,55',
     '36,3', '36,4', '36,5', '36,6', '36,7', '36,8', '36,9', '36,10', '36,12', '36,13', '36,14', '36,15', '36,16', '36,17', '36,18', '36,19', '36,21', '36,22', '36,23', '36,24', '36,25', '36,26', '36,27', '36,28', '36,30', '36,31', '36,32', '36,33', '36,34', '36,35', '36,36', '36,37', '36,39', '36,40', '36,41', '36,42', '36,43', '36,44', '36,45', '36,46', '36,48', '36,49', '36,50', '36,51', '36,52', '36,53', '36,54', '36,55',
     '38,3', '38,4', '38,5', '38,6', '38,7', '38,8', '38,9', '38,10', '38,12', '38,13', '38,14', '38,15', '38,16', '38,17', '38,18', '38,19', '38,21', '38,22', '38,23', '38,24', '38,25', '38,26', '38,27', '38,28', '38,30', '38,31', '38,32', '38,33', '38,34', '38,35', '38,36', '38,37', '38,39', '38,40', '38,41', '38,42', '38,43', '38,44', '38,45', '38,46', '38,48', '38,49', '38,50', '38,51', '38,52', '38,53', '38,54', '38,55',
     '17,8', '17,9', '17,10', '17,12', '17,13', '17,14', '17,15', '17,16', '17,17', '17,18', '17,19', '17,21', '17,22', '17,23', '17,24', '17,25', '17,26', '17,27', '17,28', '17,30', '17,31', '17,32', '17,33', '17,34', '17,35', '17,36', '17,37', '17,39', '17,40', '17,41', '17,42', '17,43', '17,44', '17,45', '17,46', '17,48', '17,49', '17,50',
     '19,8', '19,9', '19,10', '19,12', '19,13', '19,14', '19,15', '19,16', '19,17', '19,18', '19,19', '19,21', '19,22', '19,23', '19,24', '19,25', '19,26', '19,27', '19,28', '19,30', '19,31', '19,32', '19,33', '19,34', '19,35', '19,36', '19,37', '19,39', '19,40', '19,41', '19,42', '19,43', '19,44', '19,45', '19,46', '19,48', '19,49', '19,50',
     '21,8', '21,9', '21,10', '21,12', '21,13', '21,14', '21,15', '21,16', '21,17', '21,18', '21,19', '21,21', '21,22', '21,23', '21,24', '21,25', '21,26', '21,27', '21,28', '21,30', '21,31', '21,32', '21,33', '21,34', '21,35', '21,36', '21,37', '21,39', '21,40', '21,41', '21,42', '21,43', '21,44', '21,45', '21,46', '21,48', '21,49', '21,50'
     ,'16,0', '17,0', '17,1','17,2', '18,0', '18,1','18,2',  '19,0', '19,1','19,2',  '20,0', '20,1','20,2',  '21,0', '21,1','21,2', '22,0'
     ,'16,59', '17,57', '17,58','17,59', '18,57', '18,58','18,59',  '19,57', '19,58','19,59',  '20,57', '20,58','20,59',  '21,57', '21,58','21,59', '22,59'];

  for (let row = 0; row < 40; row++) {
    const currentRow = [];
    for (let col = 0; col < 60; col++) {
      const test = [row,col];
      let text = test.toString();
      if (Wallpoints.includes(text)) {
        
        currentRow.push(createWall(col, row));
        console.log('in if statment########################');

      }else{
        console.log('in if statment########################');
        currentRow.push(createNode(col, row));
      }

    }
    grid.push(currentRow);
  }/*
  
  for (let row = 0; row < 34; row++) {
    for (let col = 0; col < 60; col++) {
      if ((row === 1) && (col === 0)){
        const newGrid = grid.slice();
        const node = newGrid[row][col];
        const newNode = {
        ...node,
        isWall: !node.isWall,
      };
      newGrid[row][col] = newNode;

    }
    grid.push(currentRow);
  }*/
  
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};
const createWall = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: true,
    previousNode: null,
  };
}; 

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};


