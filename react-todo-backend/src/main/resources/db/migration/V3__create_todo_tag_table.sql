create table todo_tag (
    todo_id varchar(36) not null,
    tag_id varchar(36) not null,
    primary key (todo_id, tag_id),
    constraint fk_todo_tag_todo foreign key (todo_id) references todo(id) on delete cascade,
    constraint fk_todo_tag_tag foreign key (tag_id) references tag(id) on delete restrict
);

create index idx_todo_tag_tag_id on todo_tag (tag_id, todo_id);

