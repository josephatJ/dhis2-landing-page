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

  ngOnInit() {
    this.httpClient
      .get("../../../dhis-web-commons/menu/getModules.action")
      .subscribe(modules => {
        if (modules) {
          this.userModules = modules["modules"];
        }
      });
  }
}
