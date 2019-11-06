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
    console.log(value, groupId, shouldSlice);
    if (groupId == "others" && shouldSlice) {
      console.log(value.slice(0, itemsToSlice));
      value = value.slice(0, itemsToSlice);
    }
    return value;
  }
}
