
export class ConfiguratorUtils {

    static unflatten(data: any): any {
        if (Object(data) !== data || Array.isArray(data))
            return data;
        var regex = /\.?([^|\[\]]+)|\[(\d+)\]/g,
            resultholder: any = {};
        for (var p in data) {
            var cur = resultholder,
                prop = "",
                m: any;
            while (m = regex.exec(p)) {
                cur = cur[prop] || (cur[prop] = (m[2] ? [] : {}));
                prop = m[2] || m[1];
            }
            cur[prop] = data[p];
        }
        return resultholder[""] || resultholder;
    }

    static flatten(data: any): any {
        var result: any = {};
        function recurse (cur: any, prop: any) {
            if (Object(cur) !== cur || (Array.isArray(cur) && cur.every((i: any) => !(i instanceof Object) ))) {
                result[prop] = cur;
            } else if (Array.isArray(cur)) {
                for(var i=0, l=cur.length; i<l; i++)
                    recurse(cur[i], prop + "[" + i + "]");
                if (l == 0)
                    result[prop] = [];
            } else {
                var isEmpty = true;
                for (var p in cur) {
                    isEmpty = false;
                    recurse(cur[p], prop ? prop+"|"+p : p);
                }
                if (isEmpty && prop)
                    result[prop] = {};
            }
        }
        recurse(data, "");
        return result;
    }

}
