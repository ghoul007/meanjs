declare var $: any;

export class DatatableRemoteAjaxDemo {
  constructor() {}
  config(
    dataJSONArray,
    columns,
    cmDataTable_search,
    _theme = "default",
    _pageSize = 10,
    _class = "",
    _scroll = false,
    _footer = false,
    _sortable = true,
    _pagination = true
  ) {
    let datatable = $(".m_datatable").mDatatable({
      // datasource definition
      data: {
        type: "local",
        source: dataJSONArray,
        pageSize: _pageSize
      },
      // layout definition
      layout: {
        theme: _theme, // datatable theme
        class: _class, // custom wrapper class
        scroll: _scroll, // enable/disable datatable scroll both horizontal and vertical when needed.
        // height: 450, // datatable's body's fixed height
        footer: _footer // display/hide footer
      },
      // column sorting
      sortable: _sortable,
      pagination: _pagination,
      search: {
        input: $(`#${cmDataTable_search.searchField}`)
      },
      columns: columns
    });

    var query = datatable.getDataSourceQuery();

    cmDataTable_search.searchList.forEach(res => {
      console.log("res",res);
      $(`#${res.html}`)
        .on("change", function() {
          datatable.search($(this).val(), `${res.field}`);
        })
        .val(
          typeof query[`${res.html}`] !== "undefined"
            ? query[`${res.html}`]
            : ""
        );
    });

    // $("#m_form_status")
    //   .on("change", function() {
    //     datatable.search($(this).val(), "name");
    //   })
    //   .val(typeof query.name !== "undefined" ? query.name : "");

    // $("#m_form_type")
    //   .on("change", function() {
    //     datatable.search($(this).val(), "description");
    //   })
    //   .val(typeof query.description !== "undefined" ? query.description : "");

    $("#m_form_status, #m_form_type").selectpicker();
  }
}
