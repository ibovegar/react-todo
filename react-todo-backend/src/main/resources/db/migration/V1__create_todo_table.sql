create table todo (
    id varchar(36) primary key,
    title varchar(255) not null,
    description varchar(2000) not null default '',
    done boolean not null default false,
    created_at timestamp not null default current_timestamp
);

create index idx_todo_done_created_at on todo (done, created_at desc);
create index idx_todo_created_at on todo (created_at desc);

