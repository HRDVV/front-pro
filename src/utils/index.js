export function demo() {
    return import(/* webpackChunkName: "lodash" */'lodash').then(({default: _}) => {
        console.log(_.join([3, 24], '-'));
    })
}