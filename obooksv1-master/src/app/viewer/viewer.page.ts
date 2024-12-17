import { Component, OnInit } from '@angular/core';
import { DBHelperService } from '../services/dbhelper.service';
import { MenuController } from '@ionic/angular';
import {ActivatedRoute,Router} from '@angular/router';
import {name} from '../variables/const'
import { Capacitor } from '@capacitor/core';
import { Platform } from '@ionic/angular';



declare var ePub: any;

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.page.html',
  styleUrls: ['./viewer.page.scss'],
})
export class ViewerPage implements OnInit {
  rendition:any;
  contadorPagina=1;
  urlbook;
  book;
  theme;
  fontSize;
  fontStyle;
  lineSpacing;
  markerdb;
  marcadorM;
  marcador;
  marcadores;
  marcadoreslibro=[];
  capitulos=[];
  librico;
  user;
  currentCFI;

  constructor(  private ayuda: DBHelperService ,public menuController: MenuController,private route: ActivatedRoute, private router: Router, public dbHelper: DBHelperService,public platform: Platform   ) {   
    this.route.queryParams.subscribe(params => {
      ////console.log("auida",params)
      if (this.router.getCurrentNavigation().extras.state) {
        this.librico = this.router.getCurrentNavigation().extras.state.parametros;
        //console.log(this.librico)
        if(this.router.getCurrentNavigation().extras.state.origen=="offline"){
          document.getElementById("marker").style.display="none";
          document.getElementById("markerExpandable").style.display="none";
        }  
        ////console.log(this.urlbook,"url dentro del viewer")
      }
    })
  }
  async ionViewDidLeave(){

    if(this.user!=null){
      var peticion ={
        book_id:this.librico.id,
        reading_page:this.rendition.location.start.cfi,
        id:this.user.id
      }
      await this.dbHelper.savePage(peticion)

      var estilos={
        theme : this.theme,
        fontSize: this.fontSize,
        fontStyle:this.fontStyle,
        lineSpacing:this.lineSpacing
      }
      this.dbHelper.guardarEstiloViewer(estilos)
      
  
    }
  }
  async ngOnInit(){    
    if(!this.platform.is('hybrid')){
      document.getElementById('viewer').style.marginTop='8%'
    }else{
      document.getElementById('viewer').style.marginTop="10%"
    }
    
    if(await this.dbHelper.getUserLogged()!==undefined){
      this.user =  await this.dbHelper.getUserLogged()       

    }
    if(this.librico===undefined){
      this.urlbook="https://res.cloudinary.com/dtii9g5vr/raw/upload/v1620141723/Jane_Austen_-_Orgullo_y_Prejuicio_gii4gx.epub"
    }else if(this.librico.url_book!==null){
      this.urlbook=this.librico.url_book
      
    }
    if(this.urlbook===undefined){
      this.urlbook=this.librico
    }
    if(this.platform.is('hybrid')){
      this.book= ePub(Capacitor.convertFileSrc(this.urlbook),{ openAs: "epub" })
    }else{
      this.book= ePub(this.urlbook)
    }
    ////console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAA", this.urlbook,this.urlbook.type)
    this.rendition =this.book.renderTo("viewer", {  flow:"auto",width: "100%", height: "100%",padding:"0px" });
    //this.rendition.options.stylesheet('../home.page.scss')
    //this.rendition.themes.fontSize("140%");
    ////console.log(this.rendition.themes)
    var displayed=this.rendition.display(1);
    
    
    //this.rendition.on("relocated",this.refreshStyles());
    this.marcadorM = document.getElementById("markerselected")
    this.marcador = document.getElementById("marker")
    
    if(this.user===null){
      document.getElementById("markerExpandable").style.display='none'
    }else{
      await this.pagina()
      ////console.log(this.user)
      this.marcadores= await this.dbHelper.getMarkers(this.user)
      ////console.log(this.marcadores.data)
      if(this.librico!==undefined && this.marcadores.data!==undefined){
        ////console.log("Hay librico")
      for(var i = 0; i<this.marcadores.data.length;i++){
        if(this.librico.id===this.marcadores.data[i].book_id){
          ////console.log(this.marcadores.data[i])
          this.marcadoreslibro.unshift(this.marcadores.data[i])
        }
      }
    }
    }
    await this.setStylesFirstTime()
  }

async setStylesFirstTime(){
  var estilos  = await this.dbHelper.getStyleViewer()
  console.log(estilos)
  if(estilos!==null){
    //console.log("Hayestilosguardados")
    

    this.fontStyle=estilos.fontStyle;
    this.fontSize=estilos.fontSize;
    this.lineSpacing=estilos.lineSpacin;
    this.theme= estilos.theme;
    
   
  }else if(await this.dbHelper.oscuro===true){
    //console.log("Modo oscuro sin  estilos guardados")
    this.theme="obooksDark"
    this.estilos("theme",this.theme);
  }
  else{
    //console.log("ni modo oscuro ni estilos guardados")
    this.estilos("theme","obooks")
  }
  this.refreshStyles()

}  
checkMarker(){
    
    this.marcadorM.style.display="none"
    this.marcador.style.display="block"
    if(this.marcadores!==undefined){    
      for (let i = 0; i < this.marcadores.data.length; i++) {
      ////console.log(this.librico.id+" libro  id "+this.marcadores.data[i].book_id+" libro id del marcador actual")
      ////console.log(this.marcadores.data[i].page+" pos marcador")
      ////console.log(this.rendition.location.end.cfi+" pos libro")
      if(this.rendition.location.end.cfi===this.marcadores.data[i].page && this.librico.id===this.marcadores.data[i].book_id){
        ////console.log("Todo ok")
        this.marcadorM.style.display="block"
        this.marcador.style.display="none"
      }
    }
  }

  }
  async next(){
    this.checkMarker()
    await this.rendition.next()
    this.refreshStyles();    
    this.currentCFI=this.rendition.location.end.cfi
    ////console.log(this.currentCFI)
    
}

  async previous(){
    this.checkMarker()
    await this.rendition.prev()
    await this.refreshStyles();
    this.currentCFI=this.rendition.location.end.cfi
    ////console.log(this.currentCFI)

  }

  async selectChapter(cap){
    this.rendition.display(cap.href);
    this.refreshStyles();
    this.menuController.close("menu")
  }

  async goMarker(mark){
    await this.rendition.display(mark);
    this.refreshStyles();
    this.menuController.close("menu")
  }

  async marker(){
    if(this.user===null){
      this.dbHelper.alertInvitado()
    }else{
    if(this.marcadorM.style.display==="block"){
      this.marcadorM.style.display="none"
      this.marcador.style.display="block"
      this.markerdb=""
    }else{
      this.marcadorM.style.display="block"
      this.marcador.style.display="none"
      this.markerdb= this.currentCFI
      //console.log(this.book)
      var peticion ={
        user_id:this.user.id,
        book_id:this.librico.id,
        page:this.currentCFI
      }
      this.marcadoreslibro.push(peticion)
      this.marcadores.data.push(peticion)
      //console.log(this.currentCFI)
      //tal y como esta ahora si vas hacia delante sale bien
      //si vas para atras sale 2 páginas antes de la que toca
      //pero si cambias el tamaño de letra se va a la mierda

      //Holis :), he intentao' hacer lo del doble marker pero mu mala idea pq se hace to mal,  no se q hacer xd  jaj
      this.dbHelper.addMarker(peticion)
    }
    
  }
  }

  async pagina(){
    ////console.log("holis")
    if(this.librico!==undefined){
    var peticion ={
      book_id:this.librico.id,
      id:this.user.id
    }
    var page = await this.dbHelper.getPage(peticion)
    //console.log(page)
    this.rendition.display(page)
  }
    
    //this.refreshStyles();

    //this.rendition.location.start.displayed = pagina que vas y que hay (capitulo)
    ////console.log(this.rendition.currentLocation())
    //this.rendition.book.navigation.toc = los capitulos
  }

  estilos(caso,estilo){
    ////console.log("Casos fuera"+caso+" Estilos "+estilo)
    switch(caso){
      case "theme":
        ////console.log("Casos dentro theme"+caso+" Estilos "+estilo)
        //var menu = document.getElementById('menu')
        
        this.theme=estilo;
        var background;
        var fontColor;
        if(this.theme=='dark'){
          background="black !important";
          fontColor="white  !important";
          //menu.className= 'tdark'
        }else if(this.theme=="obooks"){
          ////console.log("Casos "+caso+" Estilos "+estilo)

          background="#F7ECE6  !important";
          fontColor='#856348  !important';
          //menu.className= 'tobooks'
        }else if(this.theme=="obooksDark"){
          background="#856348  !important";
          fontColor='#F7ECE6  !important';
        }else if(this.theme=="pink"){
          background="#fbe2fc  !important";
          fontColor='black  !important';
        }else{
          ////console.log("Casos "+caso+" Estilos "+estilo)
          background="white  !important";
          fontColor="black  !important";
          //menu.className= ' tdefault'
        }
        ////console.log("Casos "+caso+" Estilos "+estilo)
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
          },
        });
        break;
      case "fontSize":
        ////console.log("Casos entro"+caso+" Estilos "+estilo)
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
            }
          });
        break;
      case "fontStyle":
        ////console.log("Casos entro"+caso+" Estilos "+estilo)
        this.fontStyle=estilo;
        ////console.log(this.fontStyle)
        ////console.log("Casos entro"+caso+" Estilos "+estilo)

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
        ////console.log("Casos entro"+caso+" Estilos "+estilo)
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
    ////console.log("SDFSDF")
    this.estilos("theme",this.theme);
    this.estilos("fontSize",this.fontSize);
    this.estilos("fontStyle",this.fontStyle);
    this.estilos("lineSpacing",this.lineSpacing);
  }
  async openMenu() {
    this.menuController.enable(true, 'menu');
    var isOpen= await this.menuController.isOpen('menu')
    if(!isOpen){
      await this.menuController.open("menu");
    }else{
      await this.menuController.close("menu");
    }
  }

  openExpandable(expandable){

    if(expandable=="c"){
      this.capitulos=this.rendition.book.navigation.toc;
      var chapter=document.getElementById("chapterExpandable");
      if(chapter.style.display==="none"){
        document.getElementById("chapterArrowUp").style.display="block"
        document.getElementById("chapterArrowDown").style.display="none"
        chapter.style.display="block"
      }else{
        document.getElementById("chapterArrowUp").style.display="none"
        document.getElementById("chapterArrowDown").style.display="block"
        chapter.style.display="none"
      }
      chapter.style.height="fit-content";
    }else if(expandable=='m'){
      var marker=document.getElementById("markerExpandable");
      if(marker.style.display==="none"){
        document.getElementById("markerArrowUp").style.display="block"
        document.getElementById("markerArrowDown").style.display="none"
        marker.style.display="block"
      }else{
        document.getElementById("markerArrowUp").style.display="none"
        document.getElementById("markerArrowDown").style.display="block"
        marker.style.display="none"
      }
      marker.style.height="fit-content";
    }else if(expandable==='t'){

      var theme = document.getElementById("themeExpandable");
      if(theme.style.display==="none"){
        document.getElementById("pageArrowUp").style.display="block"
        document.getElementById("pageArrowDown").style.display="none"
        theme.style.display="block"
      }else{
        document.getElementById("pageArrowUp").style.display="none"
        document.getElementById("pageArrowDown").style.display="block"
        theme.style.display="none"
      }
    }else if(expandable==='s'){
      var size = document.getElementById("sizeExpandable");
      if(size.style.display==="none"){
        document.getElementById("sizeArrowUp").style.display="block"
        document.getElementById("sizeArrowDown").style.display="none"
        size.style.display="block"
      }else{
        document.getElementById("sizeArrowUp").style.display="none"
        document.getElementById("sizeArrowDown").style.display="block"
        size.style.display="none"
      }
      
    }else if(expandable==='st'){
      var style = document.getElementById("styleExpandable");
      if(style.style.display==="none"){
        document.getElementById("styleArrowUp").style.display="block"
        document.getElementById("styleArrowDown").style.display="none"
        style.style.display="block"
      }else{
        document.getElementById("styleArrowUp").style.display="none"
        document.getElementById("styleArrowDown").style.display="block"
        style.style.display="none"
      }
      
    }else if(expandable==='ls'){
      var linesp = document.getElementById("linespExpandable");
      if(linesp.style.display==="none"){
        document.getElementById("linespArrowUp").style.display="block"
        document.getElementById("linespArrowDown").style.display="none"
        linesp.style.display="block"
      }else{
        document.getElementById("linespArrowUp").style.display="none"
        document.getElementById("linespArrowDown").style.display="block"
        linesp.style.display="none"
      }
    }
  }
}
