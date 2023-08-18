type MenuType = 'creating' | 'editing';

export interface IMainMenuExtra {
  // тип меню: для создания объявления, или для редактирования
  type: MenuType;
  // создавать новое сообщение с меню или изменять текущее сообщение
  isNew?: boolean;
}
