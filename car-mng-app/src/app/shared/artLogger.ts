import { environment } from '../../environments/environment';
import { ArtLogLevel } from './ART_LOG_LEVEL';

export class ArtLogger {

    constructor() { }

    private static _log(message) {
        if (environment.logLevel !== ArtLogLevel.OFF) { // log level 이 off 이면 모든 console 을 찍지 않는다.
            console.log(message);
        }
    }

    public static trace(message) {
        if (environment.logLevel <= ArtLogLevel.TRACE) {
            this._log(message);
        }
    }

    public static debug(message) {
        if (environment.logLevel <= ArtLogLevel.DEBUG) {
            this._log(message);
        }
    }

    public static info(message) {
        if (environment.logLevel <= ArtLogLevel.INFO) {
            this._log(message);
        }
    }

    public static warn(message) {
        if (environment.logLevel <= ArtLogLevel.WARN) {
            this._log(message);
        }
    }

    public static error(message) {
        if (environment.logLevel <= ArtLogLevel.ERROR) {
            this._log(message);
        }
    }

    public static fatal(message) {
        if (environment.logLevel <= ArtLogLevel.FATAL) {
            this._log(message);
        }
    }
}


