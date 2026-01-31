import { store } from '../../store/store';
import { checkClick } from '../../utils/Colision';
import { controlsController } from '../../utils/Controls';
import { BaseElement, type coordsType, type IBaseElement } from '../Object';

interface CellProps extends IBaseElement {
  coordsOnBoard: coordsType;
}

export class Cell extends BaseElement {
  coordsOnBoard: coordsType;
  constructor(props: CellProps) {
    super(props);
    this.coordsOnBoard = props.coordsOnBoard;
    this.clickHandlerInit();
  }

  clickHandlerInit() {
    controlsController.on('init', (coords) => {
      const { x, y } = this.coordsOnBoard;
      if (checkClick(coords, this)) {
        console.log(x, y);
      }
    });
  }
}
