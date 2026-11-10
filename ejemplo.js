    // const altaOCantidadDeHoras = await Ticket.find({
    // $or: [{ prioridad: "Alta" }, { horasInvertidas: { $gt: 3 } }],
    // }).select("codigo titulo prioridad horasInvertidas -_id");
    // console.log("\nB) Tickets con prioridad alta o más de 3 horas:", altaOCantidadDeHoras);
    // console.log("Total de tickets encontrados:", altaOCantidadDeHoras.length);

    //  const bajaOConPocasHoras = await Ticket.find({
    //   $or: [{ prioridad: "Baja" }, { horasInvertidas: { $lte: 2 } }],
    // }).select("codigo titulo prioridad horasInvertidas -_id");
    // console.log("\nB) Baja o con <= 2 horas:", bajaOConPocasHoras);
    // console.log("Total de resultados B:", bajaOConPocasHoras.length);

    //const ticketsPrioritarios = await Ticket.find({
    //prioridad: { $in: ["Alta", "Crítica"] },
    //}).select("codigo titulo prioridad estado -_id");

    //console.log("A) Tickets con prioridad alta o crítica ($in):", ticketsPrioritarios);
    //console.log("Total de resultados:", ticketsPrioritarios.length);


    /* const ticketsSinHoras = await Ticket.find({
        horasInvertidas: { $exists: false },
    }).select("codigo titulo prioridad estado -_id"); 
    
    console.log("Tickets sin horas registradas ($exists: false):", ticketsSinHoras);
    console.log("Total de tickets encontrados:", ticketsSinHoras.length); */