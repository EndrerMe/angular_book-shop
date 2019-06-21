// Vendors
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Response } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
    data: T;
  }

@Injectable()
export class Underscore<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(map((data) => {
            const originData = JSON.stringify(data);
            const copyOfData = JSON.parse(originData);

            for (let i = 0; i < copyOfData.length; i++) {
                copyOfData[i].id = copyOfData[i]['_id'];
                delete copyOfData[i]['_id'];
            }

            return copyOfData;
        }));
    }
}
