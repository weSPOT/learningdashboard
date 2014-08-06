/**
 * Created by svenc on 06/08/14.
 */
var userList = function(){

    var _users;
    var drawUsers = function(data,identifier, div,filterClass)
    {
        var g = d3.select(div)
            .append("ul")
            .attr("id",identifier + "_root" );
        var spans = g.selectAll("span")
            .data(data);
        spans.enter()
            .append("li")
            .attr("selected",false)
            .on("mousedown",function(d){
                if(this.attributes.selected.value == "false")
                {
                    filterClass.select(d.key,"user");
                    //filterClass.highlight(d.key,"user");
                    this.setAttribute("selected",true);
                    this.setAttribute("class","selected");
                }
                else{
                    filterClass.deselect(d.key,"user");
                    //filterClass.unhighlight(d.key,"user");
                    this.setAttribute("selected",false);
                    this.setAttribute("class","unselected");

                }


            })
            .text(function(d){
                if(_users[d.key] != undefined)
                    return _users[d.key].name;
                return d.key;
            });
    }
    var preprocess = function(data)
    {
        var xf = crossfilter(data);
        var dim = xf.dimension(function(f){return f.username.toLowerCase();});
        return dim.group().reduce(
            function(p,v){
                p.count++;return p;

            },
            function(p,v){
                p.count--;return p;},
            function(){return {count:0};}
        ).top(Infinity);
    }
    return {
        "init" : function(data,allUsers, identifier, div,filterClass)
        {
            _users = allUsers;
            var users = preprocess(data);
            drawUsers(users,identifier,div,filterClass);
        }
    }
}();