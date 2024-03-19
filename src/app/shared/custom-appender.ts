import { Injectable } from "@angular/core";
import { LogAppender } from "./logger/log-appender";
import { LogLevel } from "./logger/log-level";

@Injectable()
export class CustomAppender implements LogAppender {
    logs: string[] = [];

    append(level: LogLevel, category: string, msg: string): void {
        this.logs.push(msg);
    }
}