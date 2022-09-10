import React, { useEffect, useState } from 'react';
import c3 from "c3";

const aggregateData = () => {
    const jsonData = require('../json/questionnaireResp250.json');
    const THREASHOLD = 0;
    let cols = [];
    let resultC3 = [];
    let outerCount = 0;
    let innerCount = 0;
    jsonData.entry.forEach(function (element) {
        let res = element.resource.item;
        innerCount = 0;
        if (typeof res === 'undefined') {
            alert("error on res");
        } else {
            res.forEach(function (item) {
                let text = item.text;
                if (!(text in resultC3)) {
                    resultC3[text] = 0;
                } else {
                    let bool = (typeof (item.answer) !== "undefined") ? item.answer[0]["valueBoolean"] : false;

                    if (bool) {
                        resultC3[text] = resultC3[text] + 1;
                    }
                }
                innerCount++;
            });
            outerCount++;
            if (outerCount === jsonData.entry.length && innerCount === res.length) {
                console.log("done");
                for (let key in resultC3) {
                    if (resultC3[key] > THREASHOLD && key !== "keine" && key !== "Keine Symptome") {
                        cols.push([key, resultC3[key]]);
                    }
                }
            }
        }
    });
    return cols;
}

export default function Chart() {
    useEffect(() => {
        const dataList = aggregateData();
        c3.generate({
            bindto: '#chart',
            data: {
                columns: dataList,
                type: 'pie',
                onclick: function (d, i) { console.log("onclick", d, i); },
                onmouseover: function (d, i) { console.log("onmouseover", d, i); },
                onmouseout: function (d, i) { console.log("onmouseout", d, i); }
            }
        });
    }, [])
    return (<div id="chart" />)
}