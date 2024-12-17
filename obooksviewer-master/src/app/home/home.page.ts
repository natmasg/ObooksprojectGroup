import { Component } from '@angular/core';
import { boooks } from '../model/book';
import { DbhelperService } from '../services/dbhelper.service';
import * as $ from 'jquery'
import { MenuController } from '@ionic/angular';


declare var ePub: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  rendition:any;
  contadorPagina=1;
  urlbook;
  book;
  theme;
  fontSize;
  fontStyle;
  lineSpacing;

  constructor(  private ayuda: DbhelperService ,public menuController: MenuController   ) {   
    
  }

  async ngOnInit(){
    await this.cogerlibro()
    this.book= ePub(this.urlbook.data[3].url_book)  
    this.rendition =this.book.renderTo("viewer", {  flow:"auto",width: "100%", height: "100%",padding:"0px" });
    //this.rendition.options.stylesheet('../home.page.scss')
    //this.rendition.themes.fontSize("140%");
    //console.log(this.rendition.themes)
    var displayed=this.rendition.display(1);
    this.estilos("theme"," ") 
    //this.rendition.on("relocated",this.refreshStyles());
  }

  next(){
    this.rendition.next()
    console.log(this.rendition.location.end.cfi)
    this.refreshStyles();
    
}

  previous(){
    this.rendition.prev()
    this.refreshStyles();

  }

  chapter(cap){
    this.rendition.display(cap);
    this.refreshStyles();

  }

  pagina(cfi){

    this.rendition.display(cfi)
    this.refreshStyles();

    //this.rendition.location.start.displayed = pagina que vas y que hay (capitulo)
    //console.log(this.rendition.currentLocation())
    //this.rendition.book.navigation.toc = los capitulos
  }

  estilos(caso,estilo){
    console.log("Casos fuera"+caso+" Estilos "+estilo)
    switch(caso){
      case "theme":
        //console.log("Casos dentro theme"+caso+" Estilos "+estilo)

        this.theme=estilo;
        var background;
        var fontColor;
        if(this.theme=='dark'){
          background="black";
          fontColor="white";
        }else if(this.theme=="obooks"){
          //console.log("Casos "+caso+" Estilos "+estilo)

          background="#E3D0C1";
          fontColor='#856348';
        }else{
          //console.log("Casos "+caso+" Estilos "+estilo)
          background="white";
          fontColor="black";
        }
        //console.log("Casos "+caso+" Estilos "+estilo)
        this.rendition.themes.default({
          h1: {
            color: fontColor
          },
          h2: {
            color: fontColor
          },
          h3: {
            color: fontColor
          },
          h4: {
            color: fontColor
          },
          h5: {
            color: fontColor
          },
          p: {
            color: fontColor
          },
          body:{
            background:background
          }
        });
        break;
      case "fontSize":
        //console.log("Casos entro"+caso+" Estilos "+estilo)
        this.fontSize=estilo;
          this.rendition.themes.default({
            h1: {
              "font-size":this.fontSize,
            },
            h2: {
              "font-size":this.fontSize,
            },
            h3: {
              "font-size":this.fontSize,
            },
            h4: {
              "font-size":this.fontSize,
            },
            h5: {
              "font-size":this.fontSize,
            },
            p: {
              "font-size":this.fontSize,
            },
          });
        break;
      case "fontStyle":
        //console.log("Casos entro"+caso+" Estilos "+estilo)
        this.fontStyle=estilo;
        //console.log("Casos entro"+caso+" Estilos "+estilo)

        this.rendition.themes.default({
          h1: {
            "font-family":this.fontStyle,
          },
          h2: {
            "font-family":this.fontStyle,
          },
          h3: {
            "font-family":this.fontStyle,
          },
          h4: {
            "font-family":this.fontStyle,
          },
          h5: {
            "font-family":this.fontStyle,
          },
          p: {
            "font-family":this.fontStyle,
          },
        });
        break;
      case "lineSpacing":
        //console.log("Casos entro"+caso+" Estilos "+estilo)
        this.lineSpacing=estilo;
        this.rendition.themes.default({
          h1: {
            "line-height":this.lineSpacing,
          },
          h2: {
            "line-height":this.lineSpacing,
          },
          h3: {
            "line-height":this.lineSpacing,
          },
          h4: {
            "line-height":this.lineSpacing,
          },
          h5: {
            "line-height":this.lineSpacing,
          },
          p: {
            "line-height":this.lineSpacing,
          },
        });
        break;


    }
  }

  refreshStyles(){
    console.log("SDFSDF")
    this.estilos("theme",this.theme);
    this.estilos("fontSize",this.fontSize);
    this.estilos("fontStyle",this.fontStyle);
    this.estilos("lineSpacing",this.lineSpacing);
  }


  async cogerlibro(){
    this.urlbook =await this.ayuda.getJson();  
  }

  async openMenu() {
    this.menuController.enable(true, 'menu');
    await this.menuController.open("menu");
  }


}
