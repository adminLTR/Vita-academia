$(document).ready(function () {
    if ($("#ciclos-container")) {
        fillCiclos(arreglo_ciclos)
    }

    $(document).on("click", ".link-ciclo", function (e) {
        // e.preventDefault();
        $("#ciclos-container").addClass("d-none").removeClass("d-block");
        $("#ciclo-info-container").removeClass("d-none").addClass("d-block");

        $("#nombre-ciclo").text(`${$(this).data("tipo")} ${universidades[$(this).data("universidad")][0]}`);
        $("#texto-ciclo").text($(this).data("text"));
        $("#inicio-ciclo").text($(this).data("inicio"));
        $("#modalidad-ciclo").text($(this).data("modalidad"));
        $("#duracion-ciclo").text($(this).data("duracion"));
        const horarios = (JSON.parse(decodeURIComponent($(this).data("horarios"))));
        let txt = ""
        Object.keys(horarios).forEach(key => {
            txt += `<li><em class="text-capitalize">${key}: </em>${horarios[key]}</li>`
        })
        $("#horarios-ciclo").html(txt);
        $("#img-ciclo").attr("src", `../img/ciclos/${$(this).data("universidad")}.png`)
    })

    $("#btn-back").click(function () {
        $("#ciclo-info-container").addClass("d-none").removeClass("d-block");
        $("#ciclos-container").removeClass("d-none").addClass("d-block");
    })
});

function fillCiclos(arreglo_ciclos) {
    arreglo_ciclos.forEach((element, index) => {
        $(`#ciclos-container .row-${element.tipo==="publica"?"publicas":"ciclos"}`).append(`
            <div class="col-sm-6 col-md-6 col-lg-3 p-2 p-md-4 text-center">
                <img src="../img/ciclos/${element.universidades[0]}.png" alt="UNMSM" height="100" class="my-2">
                <h4 class="bg-${element.universidades[0]} text-white py-1 my-0">
                    ${element.universidades.map((universidad, i) => {
                        return (i===1?'- ':'') + universidades[universidad][0]
                    }).toString().replace(/,/g, ' ')}
                </h4>
                <div class="ciclos-col p-2 p-md-3 gap-5 my-0 d-flex flex-column align-items-start rounded-bottom" style="background-color: rgb(247, 247, 247);">                                              
                    ${element.ciclos.map(ciclo => {
                        const type = ciclo.tipo;
                        
                        return `<a class="link-main link-ciclo fs-5 text-decoration-none" href="#"
                        data-tipo="${ciclo.tipo}" data-universidad="${element.universidades[0]}"
                        data-text="${ciclo.text}" data-inicio="${ciclo.inicio}" data-modalidad="${ciclo.modalidad}"
                        data-duracion="${ciclo.duracion}" data-horarios='${encodeURIComponent(JSON.stringify(ciclo.horarios))}'
                        >
                            ${type[0].toUpperCase() + type.substring(1)}</br>
                            ${universidades[element.universidades[0]][0]}
                        </a>`
                    }).toString().replace(/,/g, ' ')}                         
                </div>
            </div>
        `)
        
    });
}

