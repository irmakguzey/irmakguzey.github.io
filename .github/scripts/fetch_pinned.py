"""Write the profile's pinned GitHub repos to pinned.json for the Open-Source Projects section.

Usage: GITHUB_TOKEN=... python3 fetch_pinned.py <output path>
"""
import json
import os
import sys
import urllib.request

LOGIN = "irmakguzey"
QUERY = """
query($login: String!) {
  user(login: $login) {
    pinnedItems(first: 6, types: REPOSITORY) {
      nodes {
        ... on Repository {
          name
          owner { login }
          url
          description
          homepageUrl
          stargazerCount
          forkCount
          primaryLanguage { name color }
        }
      }
    }
  }
}
"""


def to_entries(data):
    nodes = data["data"]["user"]["pinnedItems"]["nodes"]
    return [
        {
            "owner": n["owner"]["login"],
            "name": n["name"],
            "url": n["url"],
            "description": n["description"] or "",
            "homepage": n["homepageUrl"] or "",
            "stars": n["stargazerCount"],
            "forks": n["forkCount"],
            "language": (n["primaryLanguage"] or {}).get("name", ""),
            "languageColor": (n["primaryLanguage"] or {}).get("color", ""),
        }
        for n in nodes
    ]


def main():
    req = urllib.request.Request(
        "https://api.github.com/graphql",
        data=json.dumps({"query": QUERY, "variables": {"login": LOGIN}}).encode(),
        headers={"Authorization": f"bearer {os.environ['GITHUB_TOKEN']}"},
    )
    with urllib.request.urlopen(req, timeout=30) as res:
        data = json.load(res)
    if "errors" in data:
        sys.exit(f"GraphQL errors: {data['errors']}")
    entries = to_entries(data)
    if not entries:
        sys.exit("no pinned repos returned")
    with open(sys.argv[1], "w") as f:
        json.dump(entries, f, indent=2)
    print(f"wrote {len(entries)} pinned repos")


if __name__ == "__main__":
    main()
