(this["webpackJsonpivis-traffic"]=this["webpackJsonpivis-traffic"]||[]).push([[0],{135:function(e,t,a){e.exports=a(166)},140:function(e,t,a){},141:function(e,t,a){},142:function(e,t,a){},143:function(e,t,a){},164:function(e,t,a){},165:function(e,t,a){},166:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(67),i=a.n(l),s=(a(140),a(2)),o=a(3),c=a(6),m=a(4),u=a(5),h=(a(141),a(68)),d=a(8),f=a(1),p=(a(142),function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).state={objektart:"Personenwagen",unfallschwere:"Unfall mit leicht Verletzten",strassenart:"Hauptstrasse",unfalltyp:"Fussg\xe4ngerunfall",data:null},a.handleChange=a.handleChange.bind(Object(d.a)(a)),a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"handleChange",value:function(e){var t=e.target.name,a=e.target.value;this.setState(Object(h.a)({},t,a))}},{key:"componentDidMount",value:function(){var e=this;f.c(this.props.path).then((function(t){e.setState({data:t})}))}},{key:"render",value:function(){var e,t=this,a=this.props,n=a.svgId,l=a.canvHeight,i=a.canvWidth,s=a.margin,o=a.width,c=a.height,m=this.state.data;null!==m&&function(){var a=f.o("#chart-area");e=f.l().x((function(e,t){return r(new Date(""+(1992+t)))})).y((function(e,t){return n(e)})).curve(f.d);var n,r=f.n().domain([new Date("1992"),new Date("2016")]).rangeRound([2,o]);n="Personenwagen"===t.state.objektart?f.m().domain([0,3e3]).rangeRound([c-2,0]):"Fahrrad"===t.state.objektart||"Fussg\xe4ngerIn"===t.state.objektart?f.m().domain([0,700]).rangeRound([c-2,0]):"Sachentransportfahrzeuge"===t.state.objektart||"Motorrad \xfcber 125 ccm"===t.state.objektart||"Motorrad bis 125 ccm"===t.state.objektart||"Motorfahrrad"===t.state.objektart?f.m().domain([0,400]).rangeRound([c-2,0]):f.m().domain([0,150]).rangeRound([c-2,0]);var l=f.a(r).tickFormat(f.q("%Y"));a.select("#axisX").call(l);var i=f.b(n);a.select("#axisY").call(i),a.append("text").attr("transform","rotate(-90)").attr("x",0-c/2).attr("y",0-s.left).attr("class","label").attr("dy","1em").attr("font-family","sans-serif").style("text-anchor","middle").text("Anzahl Unf\xe4lle "),a.append("text").attr("x",o/2).attr("y",c+25).attr("class","label").attr("dy","1em").attr("font-family","sans-serif").style("text-anchor","middle").text("Jahre");var u=f.o("body").append("div").attr("class","tooltip invisible");f.p("path.lines").remove();var h=m.filter((function(e){return e.Objektart===t.state.objektart})),d=function(t){var n=Object.values(h[t]).slice(0,25);a.append("path").data([n]).attr("class","lines").attr("stroke","#E1E1E1").attr("stroke-width","1.0px").attr("fill","none").attr("d",e).on("mouseover",(function(e){return u.html(h[t].Objektart+", "+h[t].Unfallschwere+", <br/>"+h[t].Strassenart+", "+h[t].Unfalltyp).style("left",f.e.pageX-2+"px").style("top",f.e.pageY-50+"px"),u.attr("class","tooltip")})).on("mouseout",(function(e){return u.attr("class","tooltip invisible")}))};for(var p in h)d(p);f.o("#selected").remove();var g=m.filter((function(e){return e.Objektart===t.state.objektart&&e.Unfallschwere===t.state.unfallschwere&&e.Strassenart===t.state.strassenart&&e.Unfalltyp===t.state.unfalltyp})),v=Object.values(g[0]).slice(0,25);a.append("path").data([v]).attr("class","lines").attr("id","selected").attr("stroke","#4889BF").attr("stroke-width","2.0px").attr("fill","none").attr("d",e).on("mouseover",(function(e){return u.html(h[0].Objektart+", "+h[0].Unfallschwere+", <br/>"+h[0].Strassenart+", "+h[0].Unfalltyp).style("left",f.e.pageX-2+"px").style("top",f.e.pageY-50+"px"),u.attr("class","tooltip")})).on("mouseout",(function(e){return u.attr("class","tooltip invisible")}))}();return r.a.createElement("div",{className:"container",id:"visualization2"},r.a.createElement("h2",null,"Art der Unf\xe4lle"),r.a.createElement("div",{className:"selection-area"},r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("div",{className:"selection-group"},r.a.createElement("h3",{className:"selection-group-title"},"Unfallverursacher"),r.a.createElement("select",{size:"3",className:"selection-items",id:"Objektart",name:"objektart",value:this.state.objektart,onChange:this.handleChange},r.a.createElement("option",{className:"item",id:"Personenwagen"},"Personenwagen"),r.a.createElement("option",{className:"item",id:"Personentransportfahrzeuge"},"Personentransportfahrzeuge"),r.a.createElement("option",{className:"item",id:"Sachentransportfahrzeuge"},"Sachentransportfahrzeuge"),r.a.createElement("option",{className:"item",id:"Kleinmotorrad"},"Kleinmotorrad"),r.a.createElement("option",{className:"item",id:"Motorrad bis 125 ccm"},"Motorrad bis 125 ccm"),r.a.createElement("option",{className:"item",id:"Motorrad \xfcber 125 ccm"},"Motorrad \xfcber 125 ccm"),r.a.createElement("option",{className:"item",id:"Fahrrad"},"Fahrrad"),r.a.createElement("option",{className:"item",id:"Motorfahrrad"},"Motorfahrrad"),r.a.createElement("option",{className:"item",id:"Fussg\xe4ngerIn"},"Fussg\xe4ngerIn"))),r.a.createElement("div",{className:"selection-group"},r.a.createElement("h3",{className:"selection-group-title"},"Unfallschwere"),r.a.createElement("select",{size:"3",className:"selection-items",id:"Unfallschwere",name:"unfallschwere",value:this.state.unfallschwere,onChange:this.handleChange},r.a.createElement("option",{className:"item",id:"Unfall mit leicht Verletzten"},"Unfall mit leicht Verletzten"),r.a.createElement("option",{className:"item",id:"Unfall mit schwer Verletzten"},"Unfall mit schwer Verletzten"),r.a.createElement("option",{className:"item",id:"Unfall mit Get\xf6teten"},"Unfall mit Get\xf6teten"))),r.a.createElement("div",{className:"selection-group"},r.a.createElement("h3",{className:"selection-group-title"},"Strassenart"),r.a.createElement("select",{size:"3",className:"selection-items",id:"Strassenart",name:"strassenart",value:this.state.strassenart,onChange:this.handleChange},r.a.createElement("option",{className:"item",id:"Autobahn"},"Autobahn"),r.a.createElement("option",{className:"item",id:"Autostrasse"},"Autostrasse"),r.a.createElement("option",{className:"item",id:"Hauptstrasse"},"Hauptstrasse"),r.a.createElement("option",{className:"item",id:"Nebenstrasse"},"Nebenstrasse"))),r.a.createElement("div",{className:"selection-group"},r.a.createElement("h3",{className:"selection-group-title"},"Unfalltyp"),r.a.createElement("select",{size:"3",className:"selection-items",id:"Unfalltyp",name:"unfalltyp",value:this.state.unfalltyp,onChange:this.handleChange},r.a.createElement("option",{className:"item",id:"Fussg\xe4ngerunfall"},"Fussg\xe4ngerunfall"),r.a.createElement("option",{className:"item",id:"Schleuder-, Selbstunfall"},"Schleuder-, Selbstunfall"),r.a.createElement("option",{className:"item",id:"Beim Kreuzen (in L\xe4ngsrichtung)"},"Beim Kreuzen (in L\xe4ngsrichtung)"),r.a.createElement("option",{className:"item",id:"Ueberholunfall"},"Ueberholunfall"),r.a.createElement("option",{className:"item",id:"Auffahrunfall"},"Auffahrunfall"),r.a.createElement("option",{className:"item",id:"Beim Vorbeifahren, Fahrstreifenwechsel"},"Beim Vorbeifahren, Fahrstreifenwechsel"),r.a.createElement("option",{className:"item",id:"Beim Richtungswechsel (mit Abbiegen)"},"Beim Richtungswechsel (mit Abbiegen)"),r.a.createElement("option",{className:"item",id:"Beim Queren (ohne Abbiegen)"},"Beim Queren (ohne Abbiegen)"),r.a.createElement("option",{className:"item",id:"Tierunfall"},"Tierunfall"))))),r.a.createElement("svg",{id:n,width:i,height:l,style:{align:"center"}},r.a.createElement("g",{id:"chart-area",transform:"translate(".concat(s.left,",").concat(s.top,")")},r.a.createElement("g",{id:"axisX",className:"axis",transform:"translate(0,".concat(c,")")}),r.a.createElement("g",{id:"axisY",className:"axis"}))),r.a.createElement("div",{className:"description"},r.a.createElement("p",null,"Hier k\xf6nnen die Unf\xe4lle nach Unfallverursacher, Unfallschwere, Strassenart und Unfalltyp gefiltert werden. Je nach ausgew\xe4hltem Unfallverursacher passt sich die Skala an, da sich die Anzahl Unf\xe4lle f\xfcr die verschiedenen Unfallverursacher stark unterscheiden. Die ausgegrauten Linien repr\xe4sentieren alle Kombiniationsm\xf6glichkeiten pro Unfallverursacher. Die blaue Linie repr\xe4sentiert die Auswahl, welcher der Benutzer mittels der Filter getroffen hat. Beim hovern \xfcber die Linien erscheint ein Tooltip mit den Daten zur jeweiligen Linie."),r.a.createElement("h4",null,"Quelle"),r.a.createElement("ul",{className:"sources"},r.a.createElement("li",null,r.a.createElement("a",{href:"https://www.bfs.admin.ch/bfs/de/home/statistiken/kataloge-datenbanken/daten.assetdetail.5267255.html",target:"_blank",rel:"noopener noreferrer"},"Strassenverkehrsunf\xe4lle: Mutmassliche M\xe4ngel und Einfl\xfcsse nach Mangel oder Einfluss, Unfallschwere, Unfalltyp, Strassenart und Objektart"),", Bundesamt f\xfcr Statistik, abgerufen am 22. Mai 2018"))))}}]),t}(n.Component));p.defaultProps={svgId:"canvas",path:"".concat("/ivis_traffic","/data_unfaelle_bereinigt.csv"),canvHeight:690,canvWidth:1110,margin:{top:70,right:15,bottom:0,left:60},height:550,width:1035};var g=p,v=(a(143),a(70)),b=a(69),E=a.n(b),w=(a(164),function(e){function t(){return Object(s.a)(this,t),Object(c.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(o.a)(t,[{key:"showTooltip",value:function(e){f.o("#mapTooltip").html(e).style("left","".concat(f.e.pageX-2,"px")).style("top","".concat(f.e.pageY-35,"px")).attr("class","tooltip")}},{key:"hideTooltip",value:function(){f.o("#mapTooltip").attr("class","tooltip invisible")}},{key:"render",value:function(){var e=this,t=this.props,a=t.id,n=t.width,l=t.height,i=this.props,s=i.country,o=i.margin,c=i.year,m=i.data,u=i.cantonMap,h=i.scale,d=i.color,p=E.a.createElement("g"),g=f.o(p);g.attr("transform","translate(".concat(o.left,",").concat(o.top,")"));var b=f.f().rotate([0,0]).center([8.3,46.8]).scale(2500).translate([n/2,l/2]).precision(.1),w=f.g().projection(b),k=v.a(s,s.objects.cantons);return null!=m&&g.selectAll("path.canton").data(k.features).enter().append("path").attr("class","canton").attr("d",w).style("fill",(function(e,t){var a=m[u[e.id]][c];return d(h(a))})).on("mouseover",(function(t){e.showTooltip("".concat(t.properties.name,": ").concat(Number(Math.round(10*m[u[t.id]][c])/10).toLocaleString()))})).on("mouseleave",(function(){e.hideTooltip()})),r.a.createElement("svg",{id:a,width:n,height:l},p.toReact())}}]),t}(n.Component));w.defaultProps={margin:{top:0,right:0,bottom:0,left:0}};var k=w,N=function(){return r.a.createElement("div",{className:"description"},r.a.createElement("p",null,'Die Visualisierung zeigt mit Hilfe von Karten der Schweiz die Entwicklung der Unf\xe4lle im Verlauf der letzten 24 Jahre (bis 2016) aufgesplittet nach Kantonen. Dabei kann im Dropdown Menu gewechselt werden zwischen den relativen Werten "Unf\xe4lle pro 1000 Fahrzeuge" und den absoluten Werten "Unf\xe4lle insgesamt". Zudem l\xe4sst die dritte Auswahlm\xf6glichkeit "Zugelassene Fahrzeuge" einen Vergleich der Unfallsentwicklung zur Anzahl Fahrzeugen zu. Beim hovern \xfcber die Schweizerkarten werden die Daten f\xfcr den jeweiligen Kanton angezeigt.'),r.a.createElement("h4",null,"Quellen"),r.a.createElement("ul",{className:"sources"},r.a.createElement("li",null,r.a.createElement("a",{href:"https://www.bfs.admin.ch/bfs/de/home/statistiken/kataloge-datenbanken/tabellen.assetdetail.4402685.html",target:"_blank",rel:"noopener noreferrer"},"Strassenfahrzeugbestand: Motorfahrzeuge ab 1990"),", Bundesamt f\xfcr Statistik, abgerufen am 29. Mai 2018"),r.a.createElement("li",null,r.a.createElement("a",{href:"https://www.bfs.admin.ch/asset/de/px-x-1106010100_101",target:"_blank",rel:"noopener noreferrer"},"Strassenverkehrsunf\xe4lle: Unf\xe4lle mit Personenschaden nach Kanton, Unfallschwere und Unfallort"),", Bundesamt f\xfcr Statistik, abgerufen am 22. Mai 2018")))},y=(a(165),function(e){function t(){return Object(s.a)(this,t),Object(c.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props,t=e.color,a=e.domain,n=e.width,l=e.height,i=Array(n).fill(0).map((function(e,t){return e+t})),s=1/n,o=a[0],c=a[1],m=a[0]>a[1];return r.a.createElement("div",{className:"mapLegend"},r.a.createElement("span",{className:"mapLegendMin"},Number(m?c:o).toLocaleString()),r.a.createElement("svg",{width:n,height:l},i.map((function(e){return r.a.createElement("path",{key:"path".concat(e),d:"M".concat(e," 0 V ").concat(l),stroke:"".concat(t(m?1-e*s:e*s)),strokeWidth:"2"})}))),r.a.createElement("span",{className:"mapLegendMax"},Number(m?o:c).toLocaleString()))}}]),t}(n.PureComponent)),j=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).state={country:null,data:null,selectedDataset:"relative",loading:!1},a.handleChange=a.handleChange.bind(Object(d.a)(a)),a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.loadDataset("relative"),f.k(this.props.paths.topo).then((function(t){e.setState({country:t})}))}},{key:"loadDataset",value:function(e){var t=this;this.setState({data:null,loading:!0}),f.c(this.props.paths[e]).then((function(a){t.setState({selectedDataset:e,data:a,loading:!1})}))}},{key:"handleChange",value:function(e){this.loadDataset(e.target.value)}},{key:"render",value:function(){var e=this.props,t=e.id,a=e.className,n=e.scales,l=e.colors,i=e.domains,s=this.state,o=s.country,c=s.data,m=s.selectedDataset,u=s.loading,h={};if(null!=c)for(var d=0;d<c.length;++d)h[c[d].Kanton]=d;var f=Array(24).fill(1993).map((function(e,t){return e+t}));return r.a.createElement("div",{id:t,className:a},r.a.createElement("h2",null,"Entwicklung der Unfallzahlen"),r.a.createElement("form",{className:"selection-area",onChange:this.handleChange},r.a.createElement("div",{className:"selection-group"},r.a.createElement("h3",{className:"selection-group-title"},"Daten ausw\xe4hlen"),r.a.createElement("select",{className:"selection-items",name:"map-selection",defaultValue:"relative"},r.a.createElement("option",{className:"item",value:"relative"},"Unf\xe4lle pro 1000 Fahrzeuge"),r.a.createElement("option",{className:"item",value:"absolute"},"Unf\xe4lle insgesamt"),r.a.createElement("option",{className:"item",value:"amount"},"Zugelassene Fahrzeuge")))),r.a.createElement("div",{className:"maps"},u&&r.a.createElement("div",{className:"mapLoading"},r.a.createElement("div",null,"Visualisierung wird geladen")),null!=o&&r.a.createElement("div",{className:"mapsContainer"},f.map((function(e){return r.a.createElement("div",{className:"map",key:"map_".concat(e)},r.a.createElement("div",{className:"mapTitle"},e),r.a.createElement(k,{id:"map".concat(e),country:o,year:e,data:c,cantonMap:h,color:l[m],scale:n[m],width:"182",height:"110"}))})))),r.a.createElement(y,{color:l[m],domain:i[m],width:200,height:16}),r.a.createElement(N,null))}}]),t}(n.Component);j.defaultProps={paths:{topo:"".concat("/ivis_traffic","/readme-swiss.json"),relative:"".concat("/ivis_traffic","/crashes-canton-relative.csv"),absolute:"".concat("/ivis_traffic","/crashes-canton-absolute.csv"),amount:"".concat("/ivis_traffic","/amount-canton-absolute.csv")},domains:{relative:[12,0],absolute:[0,4e3],amount:[0,1e6]},scales:{relative:f.m().domain([12,0]).range([0,1]),absolute:f.m().domain([0,4e3]).range([0,1]),amount:f.m().domain([0,1e6]).range([0,1])},colors:{relative:f.i,absolute:f.j,amount:f.h}};var U=j,z=function(e){function t(){return Object(s.a)(this,t),Object(c.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement("header",null,r.a.createElement("h1",null,"Strassenverkehrsunf\xe4lle in der Schweiz")),r.a.createElement("div",{className:"inner"},r.a.createElement(U,{className:"container",id:"visualization1"}),r.a.createElement("hr",{class:"divider"}),r.a.createElement(g,null)),r.a.createElement("div",{id:"mapTooltip",className:"tooltip"}))}}]),t}(n.Component),O=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function S(e){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}})).catch((function(e){console.error("Error during service worker registration:",e)}))}i.a.render(r.a.createElement(z,null),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("/ivis_traffic",window.location).origin!==window.location.origin)return;window.addEventListener("load",(function(){var e="".concat("/ivis_traffic","/service-worker.js");O?(!function(e){fetch(e).then((function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):S(e)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ")}))):S(e)}))}}()}},[[135,1,2]]]);
//# sourceMappingURL=main.b01eadd9.chunk.js.map