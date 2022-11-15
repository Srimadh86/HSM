
import {FlatTreeControl} from '@angular/cdk/tree';
import {Component,OnInit} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface PriceNode {
  name: string;
  children?: PriceNode[];
  router?:string;
}

const TREE_DATA: PriceNode[] = [
  {
    name: 'Attributization',
    router:"attribution",
    children: [{name: 'Verify Base Data'}, {name: 'Run HMSHost Data'}, {name: 'Run Comp Store Data'}],
  
  },
  {
    name: 'Scoring',
    router:"scoring",
    //children: [{name: 'Scoring'}],
  },
  {
    name: 'Ranking',
    router:"ranking",
    children: [{name: 'View & What-if'}, {name: 'Gain Sensitivity'}],
  
  },
  {
    name: 'Selection & Match',
    router:"selection",
    children: [{name: 'Analyse & Select'}, {name: 'Reports'}],
  
  },
];


/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  router: string;
  level: number;
}

/**
 * @title Tree with flat nodes
 */
@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss']
})
export class SubMenuComponent implements OnInit {
  private _transformer = (node: PriceNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      router: node.router,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  

  constructor() {
    this.dataSource.data = TREE_DATA;
  }
  ngOnInit(): void {
    
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}

