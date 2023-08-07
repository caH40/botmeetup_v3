// import { Context, Scenes } from 'telegraf';
// import { InlineKeyboardMarkup } from 'telegraf/types';

// export interface MySceneSession extends Scenes.SceneSessionData {
//   // will be available under `ctx.scene.session.mySceneSessionProp`
//   mySceneSessionProp: number;
// }
/**
 * Мы все еще можем расширить обычный объект session, который мы можем использовать в контексте
 *. Однако, поскольку мы используем сцены, мы должны расширить их
 * `Сценарная сессия`.
 *
 * * Можно передать переменную типа в `SceneSession`, если вы также хотите
 * продлите сеанс съемки сцены, как мы делали выше.
 */
// interface MySession extends Scenes.SceneSession<MySceneSession> {
//   // will be available under `ctx.session.mySessionProp`
//   channelName: string;
//   channelId: number;
//   linkedChatId: number | undefined;
//   messageDel: [];
//   start: InlineKeyboardMarkup;
//   dateStart: string;
//   time: string;
//   distance: string;
//   speed: string;
// }
// /**
//  * * Теперь, когда у нас есть наш объект session, мы можем определить наш собственный контекстный объект.
//  *
//  * Как всегда, если мы также хотим использовать наш собственный объект session, мы должны установить его
//  * здесь, в свойстве `сеанс`. Кроме того, теперь мы также должны установить объект
//  * scene в свойстве `scene`. Поскольку мы расширяем сеанс сцены, нам
//  * нужно еще раз передать тип в качестве переменной типа.
//  */
// export interface MyContext extends Context {
//   // will be available under `ctx.myContextProp`
//   myContextProp: string;
//   // declare session type
//   session: MySession;
//   // declare scene type
//   scene: Scenes.SceneContextScene<MyContext, MySceneSession>;
// }
