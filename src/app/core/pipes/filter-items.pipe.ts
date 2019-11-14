import { Pipe, PipeTransform } from "@angular/core";
import * as _ from "lodash";

@Pipe({
  name: "filterItems"
})
export class FilterItemsPipe implements PipeTransform {
  transform(
    value: any,
    groupId?: any,
    itemsToSlice?: any,
    shouldSlice?: any,
    searchTerm?: string
  ): any {
    if (groupId == "others") {
      if (shouldSlice) {
        value = value.slice(0, itemsToSlice);
      }

      if (searchTerm) {
        value = _.filter(value, function(module) {
          return module.name.indexOf(searchTerm) >= 0;
        });
      }

      return value;
    }
    return value;
  }
}
