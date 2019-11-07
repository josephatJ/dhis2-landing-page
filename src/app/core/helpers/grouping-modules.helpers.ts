import * as _ from "lodash";

export function groupModules(configs: any, modules: Array<any>) {
  let groupedModules = [];
  _.map(configs, (groupItem: any) => {
    let itemsArray = [];
    _.map(groupItem["items"], itemId => {
      let appModule = modules.find(function(element) {
        return element.name == itemId;
      });
      if (appModule && appModule.icon && appModule.icon.startsWith("..")) {
        appModule.icon = "../../" + appModule.icon;
        if (appModule.defaultAction.startsWith("..")) {
          appModule.defaultAction = "../../" + appModule.defaultAction;
        }
      } else {
        if (appModule && appModule.defaultAction.startsWith("..")) {
          appModule.defaultAction = "../../" + appModule.defaultAction;
        }
      }

      itemsArray.push(appModule);
    });
    if (groupItem.id == "others") {
      const flatArray = createArrayOfGroupedModules(configs);
      _.map(modules, module => {
        if (_.indexOf(flatArray, module.name) == -1) {
          if (module.defaultAction.startsWith("..")) {
            module.defaultAction = "../../" + module.defaultAction;

            if (module.icon.startsWith("..")) {
              module.icon = "../../" + module.icon;
            }
          } else {
            if (module.icon.startsWith("..")) {
              module.icon = "../../" + module.icon;
            }
          }
          itemsArray.push(module);
        }
      });
    }
    groupedModules.push({
      header: groupItem.header,
      id: groupItem.id,
      description: groupItem.description,
      items: itemsArray.filter(item => item)
    });
  });
  console.log(groupedModules);
  return groupedModules;
}

function createArrayOfGroupedModules(configs) {
  let flatArray = [];
  _.map(configs, group => {
    _.map(group["items"], item => {
      flatArray.push(item);
    });
  });
  return flatArray;
}
