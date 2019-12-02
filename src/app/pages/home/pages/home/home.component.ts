import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { NgxDhis2HttpClientService } from "@iapps/ngx-dhis2-http-client";
import { HttpClient } from "@angular/common/http";
import { groupModules } from "src/app/core";
import {
  trigger,
  state,
  style,
  animate,
  transition
  // ...
} from "@angular/animations";

@Component({
  selector: "app-home",
  animations: [
    trigger("openClose", [
      // ...
      state(
        "open",
        style({
          //hover styles
          boxShadow: "0 0.5rem 1rem gray"
        })
      ),
      state("closed", style({})),
      transition("open => closed", [animate("0.1s")]),
      transition("closed => open", [animate("0.1s")])
    ])
  ],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  userModules: any;

  constructor(private httpClient: HttpClient) {}

  isOpen = true;
  elemId: string;

  toggle(id) {
    this.elemId = id;
    this.isOpen = !this.isOpen;
  }

  toggleOut() {
    this.elemId = "";
    this.isOpen = !this.isOpen;
  }

  userInitModules: Array<{}> = [];
  groupedModules: Array<{}> = [];
  shouldSlice: boolean = true;
  configurations = [
    {
      id: "dataEntry",
      header: "Data entry modules",
      description: "These apps/modules are used for data entry",
      items: [
        "dhis-web-dataentry",
        "dhis-web-event-capture",
        "National-DQA",
        "dhis-web-tracker-capture"
      ]
    },
    {
      id: "reports",
      header: "Reports modules",
      description:
        "These are apps/modules used for accessing/generating reports",
      items: ["dhis-web-reporting", "dhis-web-dashboard"]
    },
    {
      id: "analysisTools",
      header: "Analysis tools",
      description:
        "These are analysis tools. You can generate reports in table, charts, maps etc formats and be able to download into excel for further analysis and use",
      items: [
        "dhis-web-pivot",
        "dhis-web-visualizer",
        "dhis-web-maps",
        "dhis-web-event-reports",
        "dhis-web-event-visualizer"
      ]
    },
    {
      id: "others",
      header: "Other modules",
      description: "More apps to help you get into more dhis2 features",
      items: ["dhis-web-data-quality", "dhis-web-cache-cleaner", "Scorecard"]
    }
  ];

  searchTerm: string;

  ngOnInit() {
    this.httpClient
      .get("../../../dhis-web-commons/menu/getModules.action")
      .subscribe(modules => {
        if (modules) {
          this.userModules = modules["modules"];
          this.userInitModules = modules["modules"];
          this.groupedModules = groupModules(
            this.configurations,
            modules["modules"]
          );
          console.log(this.groupedModules);
        }
      });
  }

  showMore() {
    this.shouldSlice = !this.shouldSlice;
  }
}
