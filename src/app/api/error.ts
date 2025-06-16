import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json(
    { error: 'Internal Server Error', message: 'Something went wrong on the server' },
    { status: 500 }
  );
}

export function POST() {
  return NextResponse.json(
    { error: 'Internal Server Error', message: 'Something went wrong on the server' },
    { status: 500 }
  );
}

export function PUT() {
  return NextResponse.json(
    { error: 'Internal Server Error', message: 'Something went wrong on the server' },
    { status: 500 }
  );
}

export function DELETE() {
  return NextResponse.json(
    { error: 'Internal Server Error', message: 'Something went wrong on the server' },
    { status: 500 }
  );
}