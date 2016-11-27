let fs = require('fs');

let posts_info = fetchPostsContentFromPostDirectoryAndPreparePostsInfoObject();

let posts_meta = posts_info.map(info => {
    return {
        'id': info.id,
        'url': '#posts/' + info.id,
        'date': info.name.substring(0, 10), // should be 2013-03-28-article-name.md like
        'title': info.title
    }
})
fs.writeFileSync('app/angular/apis/posts-meta.json', JSON.stringify(posts_meta).trim(), 'utf-8');

let posts_content = posts_info.map(info => {
    var content = {
        'id': info.id,
        'title': info.title,
        'contents': info.contents
    }
    var file_name = content.id + '.json';

    fs.writeFile('app/angular/apis/posts/' + file_name, JSON.stringify(content).trim(), 'utf-8');

    return content;
})
fs.writeFileSync('app/angular/apis/posts-content.json', JSON.stringify(posts_content).trim(), 'utf-8');

function fetchPostsContentFromPostDirectoryAndPreparePostsInfoObject() {
    return fs.readdirSync('./_posts').filter(item => item.endsWith('.md'))
        .map(post_path => {
            var contents = fs.readFileSync('./_posts/' + post_path, 'utf-8');
            const content_start_index = contents.indexOf(contents.split('---')[2]);
            var jekyll_front_matter = contents.split('---')[1];

            return {
                'id': post_path.substring(0, post_path.lastIndexOf('.')),
                'name': post_path,
                'title': jekyll_front_matter.substring((jekyll_front_matter.indexOf('title: ') + 'title: '.length), jekyll_front_matter.length).trim(),
                'contents': contents.substring(content_start_index, contents.length)
            }
    });
}
