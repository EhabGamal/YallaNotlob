import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})

@Injectable()
export class SearchPipe implements PipeTransform {
  transform(friend: any[], args?: any): any {
    return friend.filter(friend => friend.email.toLowerCase().indexOf(args.toLowerCase()) !== -1);
  }
}
