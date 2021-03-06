import Log4js from 'log4js-dist';
import {isWeChat, isAndroid, isiPhone, isElectron} from 'ua.js';

function getLogger(){
  //微信优先
  if(isWeChat()){
    return new Log4js.getLogger("WeChat");
  }
  if(isAndroid()){
    return new Log4js.getLogger('Android');
  }
  if(isiPhone()){
    return new Log4js.getLogger('iPhone');
  }
  if(isElectron()){
    return new Log4js.getLogger('Electron');
  }
  return new Log4js.getLogger("Desktop")
}

function Logger({serverDomain, port, isAppendingConsole}){
  let logger = getLogger();

  let jsonLayout = new Log4js.JSONLayout();

  let ajaxAppender = new Log4js.AjaxAppender("//"+serverDomain+":"+port+"/inputs/d00dadc0ffee");
  ajaxAppender.setLayout(jsonLayout);
  logger.addAppender(ajaxAppender);

  if(isAppendingConsole){
    let consoleAppender = new Log4js.BrowserConsoleAppender();
    consoleAppender.setLayout(jsonLayout);
    logger.addAppender(consoleAppender);
  }

  logger.setDateFormat("yyyy-MM-ddthh:mm:ss.SSSO");
  logger.setLevel(Log4js.Level.DEBUG);

  return logger;
}

export default Logger;
