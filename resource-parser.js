/**
 * @fileoverview Example to parse the resource to the format of Quantumult X.
 *
 * @supported Quantumult X (v1.0.8-build253)
 */


// $resource, $notify(title, subtitle, message)
// HTTP reqeust and persistent storage related APIs are not supported in resource parser.

// $resource.link contains the original URL of the resource or the path if the resource is local.
// $resource.content contains the response(UTF8) from the URL .

// $done({error : "error description"});
// $done({content : "the modified content"});

let content = $resource.content || "";
let lines = content.split("\n");
let parsedLines = [];

const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}(\/\d+)?$/; // IPv4
const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){1,7}(?:[0-9a-fA-F]{1,4}|:)(\/\d+)?$/; // IPv6
const ipAsnRegex = /^IP-ASN,\d+$/; // IP-ASN

lines.forEach(line => {
    line = line.split("//")[0].split("#")[0].trim();

    if (line === "") return;

    if (ipv4Regex.test(line)) {
        parsedLines.push(`ip-cidr, ${line}, proxy`);
    } else if (ipv6Regex.test(line)) {
        parsedLines.push(`ip6-cidr, ${line}, proxy`);
    } else if (ipAsnRegex.test(line)) {
        parsedLines.push(`${line}, proxy`);
    }
});

$done({ content: parsedLines.join("\n") });