
import {FlatTreeControl} from '@angular/cdk/tree';
import {Component,OnInit} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { MasterDataService } from '../Services/master-data.service';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface PriceNode {
  name: string;
  children?: PriceNode[];
  router?:string;
}


const TREE2_DATA: PriceNode[] = [
  {
    name: 'Master Data',
    router:"master",
    children: [{name: 'upload data', router:"uploadmaster",}, {name:'manage data', router:"master",}],
  
  },
  {
    name: 'Configuration Data',
    router:"configuration",
    children: [{name: 'upload data', router:"uploadmaster",}, {name:'manage data', router:"master",}],
  
  },
  {
    name: 'Transaction Data',
    router:"transaction",
    children: [{name: 'upload data', router:"upload-transaction-master"}, {name:'manage data', router:"transaction-data-master",}],
  },
  {
    name: 'System Log',
    router:"systemlog",
    //children: [{name: 'Apple'}],
  
  },
  {
    name: 'Download Data',
    router:"download",
    //children: [{name: 'Apple'}],
  
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
  selector: 'app-sub-menu2',
  templateUrl: './sub-menu2.component.html',
  styleUrls: ['./sub-menu2.component.scss']
})
export class SubMenu2Component implements OnInit {
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

  dataSource2 = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private masterDataService:MasterDataService) {
    this.dataSource2.data = TREE2_DATA;
  }

  updateData() {
    this.masterDataService.reloadUrlData(true);
  }

  ngOnInit(): void {
    
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}

