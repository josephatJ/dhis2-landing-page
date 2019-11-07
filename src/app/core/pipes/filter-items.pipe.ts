import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterItems"
})
export class FilterItemsPipe implements PipeTransform {
  transform(
    value: any,
    groupId?: any,
    itemsToSlice?: any,
    shouldSlice?: any
  ): any {
    if (groupId == "others" && shouldSlice) {
      value = value.slice(0, itemsToSlice);
    }
    return value;
  }
}
