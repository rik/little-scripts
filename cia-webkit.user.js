// ==UserScript==
// @name          Webkit - CIA
// @description   Add a link to webkit changesets in Trac
// @include       http://cia.vc/stats/project/WebKit/.message/*
// @include       http://cia.vc/stats/project/WebKit
// ==/UserScript==

var base = "http://trac.webkit.org/changeset/";

function addLink(revision)
{
    var a = document.createElement('a');
    a.href = base + revision.firstChild.data;
    a.appendChild(document.createTextNode(revision.firstChild.data));
    revision.parentNode.replaceChild(a, revision);
    
}

var table = document.getElementsByClassName('messageHeaders');
if(table.length > 0)
{
    // We are on a commit page
    var headers = table[0].getElementsByTagName('td');
    for (var i = 0, length = headers.length; i < length; i++)
    {
        var td = headers[i];
        if (td.className == 'name' && td.firstChild.data.toLowerCase().indexOf('revision') >= 0)
        {
            var revision = headers[i + 1];
            break;
        }
    }
    addLink(revision);
} else
{
    var revisions = document.querySelectorAll('.main table div b:first-of-type');
    for (var i = 0, length = revisions.length; i < length; i++)
    {
        var revision = revisions[i];
        addLink(revision);
    }
}