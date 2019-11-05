import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { NgxDhis2HttpClientService } from "@iapps/ngx-dhis2-http-client";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  userModules: any;
  constructor(private httpClient: HttpClient) {}

  userInitModules: Array<{}> = [];
  otherUserModules: Array<{}> = [];
  showingMore: boolean = false;
  defaultApps: Array<string> = [
    "dhis-web-dashboard",
    "dhis-web-pivot",
    "dhis-web-visualizer",
    "dhis-web-event-visualizer",
    "dhis-web-dataentry",
    "dhis-web-event-reports",
    "dhis-web-cache-cleaner",
    "dhis-web-data-quality"
  ];

  ngOnInit() {
    this.httpClient
      .get("../../../dhis-web-commons/menu/getModules.action")
      .subscribe(modules => {
        if (modules) {
          //this.userModules = modules["modules"];
          var count = 0;

          modules["modules"].forEach(user => {
            count++;

            if (user.icon.startsWith("..")) {
              user.icon = "../../" + user.icon;

              if (user.defaultAction.startsWith("..")) {
                user.defaultAction == "../../" + user.defaultAction;
              }

              if (modules["modules"].length == count) {
                this.userModules = modules["modules"];
                this.otherUserModules = this.userModules;

                //load apps to display by default
                this.defaultApps.forEach(app => {
                  var appData = this.userModules.find(function(element) {
                    return element.name == app;
                  });

                  this.userInitModules.push(appData);
                  console.log(this.userInitModules);
                });
              }
            } else {
              if (user.defaultAction.startsWith("..")) {
                user.defaultAction == "../../" + user.defaultAction;
              }

              if (modules["modules"].length == count) {
                this.userModules = modules["modules"];
                this.otherUserModules = this.userModules;

                //load apps to display by default
                this.defaultApps.forEach(app => {
                  var appData = this.userModules.find(function(element) {
                    return element.name == app;
                  });

                  this.userInitModules.push(appData);
                  console.log(this.userInitModules);
                });
              }
            }
          });
        }
      });
  }

  showMore() {
    if (this.showingMore) {
      this.showingMore = false;
    } else {
      this.showingMore = true;
    }
  }
}
