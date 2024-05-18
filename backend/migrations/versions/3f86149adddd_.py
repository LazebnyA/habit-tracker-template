"""empty message

Revision ID: 3f86149adddd
Revises: 25f4a6ab4957
Create Date: 2024-05-09 11:02:03.803973

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = '3f86149adddd'
down_revision: Union[str, None] = '25f4a6ab4957'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('habit_track',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('date', sa.DateTime(), nullable=False),
    sa.Column('habitID', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['habitID'], ['habit.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_habit_track_id'), 'habit_track', ['id'], unique=False)
    op.alter_column('habit', 'created_date',
               existing_type=postgresql.TIMESTAMP(timezone=True),
               type_=sa.DateTime(),
               existing_nullable=False,
               existing_server_default=sa.text('now()'))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('habit', 'created_date',
               existing_type=sa.DateTime(),
               type_=postgresql.TIMESTAMP(timezone=True),
               existing_nullable=False,
               existing_server_default=sa.text('now()'))
    op.drop_index(op.f('ix_habit_track_id'), table_name='habit_track')
    op.drop_table('habit_track')
    # ### end Alembic commands ###
